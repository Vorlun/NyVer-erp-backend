var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
import { Injectable, NotFoundException, ConflictException, Logger, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
let UsersService = UsersService_1 = class UsersService {
    prisma;
    mailService;
    jwtService;
    configService;
    logger = new Logger(UsersService_1.name);
    constructor(prisma, mailService, jwtService, configService) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async findAll(query) {
        const { role, status, search, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (role) {
            where.role = role;
        }
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    email: true,
                    phone: true,
                    tempPassword: true,
                    birthDate: true,
                    photo: true,
                    coins: true,
                    address: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    studentEnrollments: {
                        include: {
                            group: {
                                select: {
                                    id: true,
                                    name: true,
                                    status: true,
                                },
                            },
                        },
                    },
                    teachingGroups: {
                        include: {
                            group: {
                                select: {
                                    id: true,
                                    name: true,
                                    status: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                email: true,
                phone: true,
                tempPassword: true,
                birthDate: true,
                photo: true,
                coins: true,
                address: true,
                status: true,
                created_at: true,
                updated_at: true,
                studentEnrollments: {
                    include: {
                        group: {
                            include: {
                                course: true,
                                room: true,
                                teachers: { include: { teacher: true } },
                            },
                        },
                    },
                },
                teachingGroups: {
                    include: {
                        group: {
                            include: {
                                course: true,
                                room: true,
                                _count: { select: { students: true } },
                            },
                        },
                    },
                },
                payments: {
                    orderBy: { created_at: 'desc' },
                },
                studentAttendances: {
                    take: 30,
                    orderBy: { created_at: 'desc' },
                    include: {
                        lesson: {
                            include: { group: true },
                        },
                    },
                },
                coinTransactions: {
                    take: 20,
                    orderBy: { created_at: 'desc' },
                },
            },
        });
        if (!user) {
            throw new NotFoundException(`Foydalanuvchi (ID: ${id}) topilmadi`);
        }
        return user;
    }
    async create(dto) {
        const existingPhone = await this.prisma.user.findUnique({
            where: { phone: dto.phone },
        });
        if (existingPhone) {
            throw new ConflictException("Bu telefon raqami allaqachon ro'yxatdan o'tgan");
        }
        if (dto.email) {
            const existingEmail = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existingEmail) {
                throw new ConflictException("Bu email allaqachon ro'yxatdan o'tgan");
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                role: dto.role,
                phone: dto.phone,
                email: dto.email || null,
                password: hashedPassword,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
                address: dto.address || null,
                photo: dto.photo || null,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                email: true,
                phone: true,
                birthDate: true,
                photo: true,
                coins: true,
                address: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        if (user.email) {
            const login = user.email || user.phone;
            const inviteToken = await this.jwtService.signAsync({ sub: user.id, type: 'set-password' }, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '24h',
            });
            const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
            const setPasswordUrl = `${frontendUrl}/set-password?token=${inviteToken}`;
            try {
                await this.mailService.sendAdminCreatedAccountEmail(user.email, `${user.firstName} ${user.lastName}`, login, setPasswordUrl);
            }
            catch (err) {
                this.logger.error(`Email yuborishda xatolik: ${err.message}`, err.stack);
            }
        }
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.phone) {
            const existingPhone = await this.prisma.user.findFirst({
                where: { phone: dto.phone, NOT: { id } },
            });
            if (existingPhone) {
                throw new ConflictException('Bu telefon raqami boshqa foydalanuvchiga tegishli');
            }
        }
        if (dto.email) {
            const existingEmail = await this.prisma.user.findFirst({
                where: { email: dto.email, NOT: { id } },
            });
            if (existingEmail) {
                throw new ConflictException('Bu email boshqa foydalanuvchiga tegishli');
            }
        }
        const data = {};
        if (dto.firstName !== undefined)
            data.firstName = dto.firstName;
        if (dto.lastName !== undefined)
            data.lastName = dto.lastName;
        if (dto.role !== undefined)
            data.role = dto.role;
        if (dto.phone !== undefined)
            data.phone = dto.phone;
        if (dto.email !== undefined)
            data.email = dto.email;
        if (dto.address !== undefined)
            data.address = dto.address;
        if (dto.photo !== undefined)
            data.photo = dto.photo;
        if (dto.birthDate !== undefined)
            data.birthDate = new Date(dto.birthDate);
        const user = await this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                email: true,
                phone: true,
                birthDate: true,
                photo: true,
                coins: true,
                address: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        return user;
    }
    async changePassword(id, dto) {
        await this.findOne(id);
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        return { message: "Parol muvaffaqiyatli o'zgartirildi" };
    }
    async changeStatus(id, dto) {
        await this.findOne(id);
        const user = await this.prisma.user.update({
            where: { id },
            data: { status: dto.status },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
            },
        });
        return user;
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: `Foydalanuvchi (ID: ${id}) muvaffaqiyatli o'chirildi` };
    }
    async topUpBalance(userId, dto) {
        await this.findOne(userId);
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
};
UsersService = UsersService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MailService,
        JwtService,
        ConfigService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map