var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
let PaymentsService = class PaymentsService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async findAll(query) {
        const where = {};
        if (query.studentId)
            where.studentId = query.studentId;
        if (query.status)
            where.status = query.status;
        if (query.dateFrom || query.dateTo) {
            where.paidForDate = {};
            if (query.dateFrom)
                where.paidForDate.gte = new Date(query.dateFrom);
            if (query.dateTo)
                where.paidForDate.lte = new Date(query.dateTo);
        }
        const [payments, total] = await this.prisma.$transaction([
            this.prisma.payment.findMany({
                where,
                orderBy: { created_at: 'desc' },
                include: {
                    student: {
                        select: { id: true, firstName: true, lastName: true, phone: true, email: true, tempPassword: true },
                    },
                    course: {
                        select: { id: true, name: true, price: true },
                    },
                },
            }),
            this.prisma.payment.count({ where }),
        ]);
        const paidPayments = payments.filter((p) => p.status === 'PAID');
        const pendingPayments = payments.filter((p) => p.status === 'PENDING');
        const totalPaidAmount = paidPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        return {
            data: payments,
            total,
            totalAmount: totalPaidAmount,
            totalPaidAmount,
            totalPendingAmount,
            paidCount: paidPayments.length,
            pendingCount: pendingPayments.length,
        };
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true,
                        tempPassword: true,
                    },
                },
                course: {
                    select: { id: true, name: true, price: true },
                },
            },
        });
        if (!payment)
            throw new NotFoundException(`To'lov (ID: ${id}) topilmadi`);
        return payment;
    }
    async processOnlineCheckout(dto) {
        if (!dto.phone || !dto.fullName) {
            throw new BadRequestException("Ism va telefon raqami to'ldirilishi shart");
        }
        const cleanPhone = dto.phone.trim().replace(/[\s-]/g, '');
        const cleanEmail = dto.email ? dto.email.trim().toLowerCase() : null;
        const parts = dto.fullName.trim().split(/\s+/);
        const firstName = parts[0] || 'Talaba';
        const lastName = parts.slice(1).join(' ') || '';
        let student = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { phone: cleanPhone },
                    ...(cleanEmail ? [{ email: cleanEmail }] : []),
                ],
            },
        });
        let isNewStudent = false;
        let tempPassword = null;
        if (!student) {
            isNewStudent = true;
            tempPassword = 'NyVer#' + Math.floor(1000 + Math.random() * 9000);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            student = await this.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    phone: cleanPhone,
                    email: cleanEmail,
                    role: 'STUDENT',
                    status: 'ACTIVE',
                    password: hashedPassword,
                    tempPassword,
                },
            });
        }
        else {
            if (!student.email && cleanEmail) {
                student = await this.prisma.user.update({
                    where: { id: student.id },
                    data: { email: cleanEmail },
                });
            }
        }
        let course = null;
        if (typeof dto.courseId === 'number' || !isNaN(Number(dto.courseId))) {
            course = await this.prisma.course.findUnique({
                where: { id: Number(dto.courseId) },
            });
        }
        if (!course && typeof dto.courseId === 'string') {
            course = await this.prisma.course.findFirst({
                where: { name: { contains: dto.courseId, mode: 'insensitive' } },
            });
        }
        let savedReceiptUrl = dto.receiptUrl ? dto.receiptUrl.trim() : null;
        if (savedReceiptUrl && savedReceiptUrl.startsWith('data:image')) {
            savedReceiptUrl = this.saveBase64Receipt(savedReceiptUrl);
        }
        const last4 = dto.cardNumber ? dto.cardNumber.replace(/\s+/g, '').slice(-4) : '****';
        const payment = await this.prisma.payment.create({
            data: {
                amount: dto.amount,
                type: dto.paymentType || 'CLICK',
                status: 'PENDING',
                paidForDate: new Date(),
                receiptUrl: savedReceiptUrl,
                comment: dto.notes ||
                    dto.comment ||
                    `Onlayn to'lov (${dto.paymentType || 'CLICK'}) - Karta: *${last4} - Kurs: ${course?.name || dto.courseId}`,
                studentId: student.id,
                courseId: course ? course.id : null,
            },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true, email: true, tempPassword: true },
                },
                course: {
                    select: { id: true, name: true, price: true },
                },
            },
        });
        return {
            success: true,
            paymentId: payment.id,
            amount: payment.amount,
            status: payment.status,
            receiptUrl: payment.receiptUrl,
            isNewStudent,
            student: {
                id: student.id,
                fullName: `${student.firstName} ${student.lastName}`.trim(),
                phone: student.phone,
                email: student.email,
            },
            courseName: course ? course.name : String(dto.courseId),
            message: "To'lov qabul qilindi. Admin tasdiqlashi bilan email pochtangizga login va parol yuboriladi.",
        };
    }
    saveBase64Receipt(base64Data) {
        try {
            const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return base64Data;
            }
            const rawExt = matches[1].split('/')[1] || 'png';
            const ext = rawExt.includes('jpeg') ? 'jpg' : rawExt;
            const buffer = Buffer.from(matches[2], 'base64');
            const uploadDir = path.join(process.cwd(), 'uploads', 'receipts');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filename = `receipt-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, buffer);
            return `/uploads/receipts/${filename}`;
        }
        catch (err) {
            console.error('Failed to save base64 receipt:', err);
            return base64Data;
        }
    }
    saveReceiptBuffer(file) {
        const rawExt = path.extname(file.originalname).replace('.', '') || 'png';
        const ext = rawExt.includes('jpeg') ? 'jpg' : rawExt;
        const uploadDir = path.join(process.cwd(), 'uploads', 'receipts');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filename = `receipt-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, file.buffer);
        return `/uploads/receipts/${filename}`;
    }
    async approvePayment(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                student: true,
                course: true,
            },
        });
        if (!payment) {
            throw new NotFoundException(`To'lov (ID: ${id}) topilmadi`);
        }
        const updatedPayment = await this.prisma.payment.update({
            where: { id },
            data: { status: 'PAID' },
            include: {
                student: true,
                course: true,
            },
        });
        const student = updatedPayment.student;
        let tempPassword = student.tempPassword;
        if (!tempPassword) {
            tempPassword = 'NyVer#' + Math.floor(1000 + Math.random() * 9000);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            await this.prisma.user.update({
                where: { id: student.id },
                data: { tempPassword, password: hashedPassword, status: 'ACTIVE' },
            });
        }
        let group = null;
        if (payment.courseId) {
            group = await this.prisma.group.findFirst({
                where: { courseId: payment.courseId, status: 'ACTIVE' },
            });
            if (!group) {
                group = await this.prisma.group.findFirst({
                    where: { courseId: payment.courseId },
                });
            }
            if (group) {
                const existingEnrollment = await this.prisma.groupStudent.findUnique({
                    where: {
                        studentId_groupId: {
                            studentId: student.id,
                            groupId: group.id,
                        },
                    },
                });
                if (!existingEnrollment) {
                    await this.prisma.groupStudent.create({
                        data: {
                            studentId: student.id,
                            groupId: group.id,
                            status: 'ACTIVE',
                        },
                    });
                }
            }
        }
        const courseName = payment.course?.name || 'NyVer IT Kursi';
        let emailSent = false;
        if (student.email) {
            try {
                emailSent = await this.mailService.sendWelcomeCredentialsEmail({
                    to: student.email,
                    studentName: `${student.firstName} ${student.lastName}`.trim(),
                    login: student.email,
                    password: tempPassword,
                    courseName,
                    amount: Number(payment.amount),
                });
            }
            catch (err) {
                console.error('Email yuborishda xatolik:', err);
            }
        }
        return {
            success: true,
            message: "To'lov muvaffaqiyatli tasdiqlandi va talaba guruhga biriktirildi",
            paymentId: payment.id,
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`.trim(),
            login: student.email || student.phone,
            tempPassword,
            courseName,
            groupName: group ? group.name : null,
            emailSent,
        };
    }
    async create(dto) {
        const student = await this.prisma.user.findUnique({
            where: { id: dto.studentId },
        });
        if (!student || student.role !== 'STUDENT') {
            throw new NotFoundException('Talaba topilmadi');
        }
        return this.prisma.payment.create({
            data: {
                amount: dto.amount,
                type: dto.type ?? 'CASH',
                status: dto.status ?? 'PAID',
                paidForDate: new Date(dto.paidForDate),
                comment: dto.comment || null,
                studentId: dto.studentId,
            },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.amount !== undefined)
            data.amount = dto.amount;
        if (dto.type !== undefined)
            data.type = dto.type;
        if (dto.status !== undefined)
            data.status = dto.status;
        if (dto.comment !== undefined)
            data.comment = dto.comment || null;
        if (dto.paidForDate !== undefined)
            data.paidForDate = new Date(dto.paidForDate);
        if (dto.studentId !== undefined) {
            data.student = { connect: { id: dto.studentId } };
        }
        return this.prisma.payment.update({
            where: { id },
            data,
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.payment.delete({ where: { id } });
        return { message: `To'lov (ID: ${id}) o'chirildi` };
    }
    async topUpBalance(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new NotFoundException('Foydalanuvchi topilmadi');
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { balance: { increment: dto.amount } },
            select: { id: true, firstName: true, lastName: true, balance: true },
        });
        return {
            success: true,
            message: `Balansga ${dto.amount.toLocaleString()} so'm qo'shildi`,
            userId: updated.id,
            fullName: `${updated.firstName} ${updated.lastName}`.trim(),
            newBalance: Number(updated.balance),
        };
    }
    async payFromBalance(dto) {
        const student = await this.prisma.user.findUnique({
            where: { id: dto.studentId },
        });
        if (!student)
            throw new NotFoundException('Talaba topilmadi');
        const course = await this.prisma.course.findUnique({
            where: { id: dto.courseId },
        });
        if (!course)
            throw new NotFoundException('Kurs topilmadi');
        const price = Number(course.price);
        const balance = Number(student.balance);
        if (balance < price) {
            throw new BadRequestException(`Balansda yetarli mablag' yo'q. Kerak: ${price.toLocaleString()} so'm, Mavjud: ${balance.toLocaleString()} so'm`);
        }
        const [payment, enrollment] = await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: dto.studentId },
                data: { balance: { decrement: price } },
            });
            const pay = await tx.payment.create({
                data: {
                    amount: price,
                    type: 'CASH',
                    status: 'PAID',
                    paidForDate: new Date(),
                    comment: `Balansdan to'lov — Kurs: ${course.name}`,
                    studentId: dto.studentId,
                    courseId: dto.courseId,
                },
            });
            let enr = null;
            const group = await tx.group.findFirst({
                where: { courseId: dto.courseId, status: 'ACTIVE' },
            });
            if (group) {
                const exists = await tx.groupStudent.findUnique({
                    where: { studentId_groupId: { studentId: dto.studentId, groupId: group.id } },
                });
                if (!exists) {
                    enr = await tx.groupStudent.create({
                        data: { studentId: dto.studentId, groupId: group.id, status: 'ACTIVE' },
                    });
                }
            }
            return [pay, enr];
        });
        if (student.email) {
            this.mailService
                .sendWelcomeCredentialsEmail({
                to: student.email,
                studentName: `${student.firstName} ${student.lastName}`.trim(),
                login: student.email,
                password: student.tempPassword || '(mavjud parolingiz)',
                courseName: course.name,
                amount: price,
            })
                .catch(() => { });
        }
        return {
            success: true,
            message: `"${course.name}" kursi balansdan muvaffaqiyatli sotib olindi`,
            paymentId: payment.id,
            courseId: course.id,
            courseName: course.name,
            amountDeducted: price,
            enrolled: !!enrollment,
        };
    }
    async getStats() {
        const payments = await this.prisma.payment.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
            },
        });
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const paidPayments = payments.filter((p) => p.status === 'PAID');
        const pendingPayments = payments.filter((p) => p.status === 'PENDING');
        const totalPaidAmount = paidPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        const thisMonthPaid = paidPayments.filter((p) => {
            const d = new Date(p.paidForDate || p.created_at);
            return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
        });
        const thisMonthPending = pendingPayments.filter((p) => {
            const d = new Date(p.paidForDate || p.created_at);
            return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
        });
        const thisYearPaid = paidPayments.filter((p) => {
            const d = new Date(p.paidForDate || p.created_at);
            return d.getFullYear() === currentYear;
        });
        const thisYearPending = pendingPayments.filter((p) => {
            const d = new Date(p.paidForDate || p.created_at);
            return d.getFullYear() === currentYear;
        });
        const debtorStudentIds = new Set(pendingPayments.map((p) => p.studentId));
        const byType = {};
        for (const p of paidPayments) {
            const t = p.type || 'CASH';
            if (!byType[t])
                byType[t] = { count: 0, sum: 0 };
            byType[t].count++;
            byType[t].sum += Number(p.amount);
        }
        return {
            allTime: {
                totalPaidAmount,
                totalPendingAmount,
                paidCount: paidPayments.length,
                pendingCount: pendingPayments.length,
            },
            thisMonth: {
                totalPaidAmount: thisMonthPaid.reduce((sum, p) => sum + Number(p.amount), 0),
                totalPendingAmount: thisMonthPending.reduce((sum, p) => sum + Number(p.amount), 0),
                paidCount: thisMonthPaid.length,
                pendingCount: thisMonthPending.length,
            },
            thisYear: {
                totalPaidAmount: thisYearPaid.reduce((sum, p) => sum + Number(p.amount), 0),
                totalPendingAmount: thisYearPending.reduce((sum, p) => sum + Number(p.amount), 0),
                paidCount: thisYearPaid.length,
                pendingCount: thisYearPending.length,
            },
            debtorsCount: debtorStudentIds.size,
            byType,
            recentPayments: payments.slice(0, 10),
        };
    }
};
PaymentsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MailService])
], PaymentsService);
export { PaymentsService };
//# sourceMappingURL=payments.service.js.map