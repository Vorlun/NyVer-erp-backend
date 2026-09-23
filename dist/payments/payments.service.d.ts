import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { CreatePaymentDto, UpdatePaymentDto, QueryPaymentDto, OnlineCheckoutDto, PayFromBalanceDto, TopUpBalanceDto } from './dto/create-payment.dto.js';
import type { Prisma } from '@prisma/client';
export declare class PaymentsService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    findAll(query: QueryPaymentDto): Promise<{
        data: ({
            course: {
                id: number;
                name: string;
                price: Prisma.Decimal;
            } | null;
            student: {
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                tempPassword: string | null;
            };
        } & {
            type: import("@prisma/client").$Enums.PaymentType;
            id: number;
            status: import("@prisma/client").$Enums.PaymentStatus;
            created_at: Date;
            updated_at: Date;
            amount: Prisma.Decimal;
            paidForDate: Date;
            comment: string | null;
            studentId: number;
            courseId: number | null;
            receiptUrl: string | null;
        })[];
        total: number;
        totalAmount: number;
        totalPaidAmount: number;
        totalPendingAmount: number;
        paidCount: number;
        pendingCount: number;
    }>;
    findOne(id: number): Promise<{
        course: {
            id: number;
            name: string;
            price: Prisma.Decimal;
        } | null;
        student: {
            id: number;
            email: string | null;
            phone: string;
            firstName: string;
            lastName: string;
            tempPassword: string | null;
        };
    } & {
        type: import("@prisma/client").$Enums.PaymentType;
        id: number;
        status: import("@prisma/client").$Enums.PaymentStatus;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        paidForDate: Date;
        comment: string | null;
        studentId: number;
        courseId: number | null;
        receiptUrl: string | null;
    }>;
    processOnlineCheckout(dto: OnlineCheckoutDto): Promise<{
        success: boolean;
        paymentId: number;
        amount: Prisma.Decimal;
        status: import("@prisma/client").$Enums.PaymentStatus;
        receiptUrl: string | null;
        isNewStudent: boolean;
        student: {
            id: number;
            fullName: string;
            phone: string;
            email: string | null;
        };
        courseName: string;
        message: string;
    }>;
    saveBase64Receipt(base64Data: string): string;
    saveReceiptBuffer(file: {
        buffer: Buffer;
        originalname: string;
    }): string;
    approvePayment(id: number): Promise<{
        success: boolean;
        message: string;
        paymentId: number;
        studentId: number;
        studentName: string;
        login: string;
        tempPassword: string;
        courseName: string;
        groupName: string | null;
        emailSent: boolean;
    }>;
    create(dto: CreatePaymentDto): Promise<{
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
    } & {
        type: import("@prisma/client").$Enums.PaymentType;
        id: number;
        status: import("@prisma/client").$Enums.PaymentStatus;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        paidForDate: Date;
        comment: string | null;
        studentId: number;
        courseId: number | null;
        receiptUrl: string | null;
    }>;
    update(id: number, dto: UpdatePaymentDto): Promise<{
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
    } & {
        type: import("@prisma/client").$Enums.PaymentType;
        id: number;
        status: import("@prisma/client").$Enums.PaymentStatus;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        paidForDate: Date;
        comment: string | null;
        studentId: number;
        courseId: number | null;
        receiptUrl: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    topUpBalance(userId: number, dto: TopUpBalanceDto): Promise<{
        success: boolean;
        message: string;
        userId: number;
        fullName: string;
        newBalance: number;
    }>;
    payFromBalance(dto: PayFromBalanceDto): Promise<{
        success: boolean;
        message: string;
        paymentId: number;
        courseId: number;
        courseName: string;
        amountDeducted: number;
        enrolled: boolean;
    }>;
    getStats(): Promise<{
        allTime: {
            totalPaidAmount: number;
            totalPendingAmount: number;
            paidCount: number;
            pendingCount: number;
        };
        thisMonth: {
            totalPaidAmount: number;
            totalPendingAmount: number;
            paidCount: number;
            pendingCount: number;
        };
        thisYear: {
            totalPaidAmount: number;
            totalPendingAmount: number;
            paidCount: number;
            pendingCount: number;
        };
        debtorsCount: number;
        byType: Record<string, {
            count: number;
            sum: number;
        }>;
        recentPayments: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            type: import("@prisma/client").$Enums.PaymentType;
            id: number;
            status: import("@prisma/client").$Enums.PaymentStatus;
            created_at: Date;
            updated_at: Date;
            amount: Prisma.Decimal;
            paidForDate: Date;
            comment: string | null;
            studentId: number;
            courseId: number | null;
            receiptUrl: string | null;
        })[];
    }>;
}
