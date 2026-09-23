import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto, UpdatePaymentDto, QueryPaymentDto, OnlineCheckoutDto, PayFromBalanceDto } from './dto/create-payment.dto.js';
import type { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    onlineCheckout(dto: OnlineCheckoutDto): Promise<{
        success: boolean;
        paymentId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
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
    uploadReceipt(file?: Express.Multer.File, body?: {
        image?: string;
    }): Promise<{
        url: string;
        success: boolean;
    }>;
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
    payFromBalance(dto: PayFromBalanceDto): Promise<{
        success: boolean;
        message: string;
        paymentId: number;
        courseId: number;
        courseName: string;
        amountDeducted: number;
        enrolled: boolean;
    }>;
    findAll(query: QueryPaymentDto, req: AuthenticatedRequest): Promise<{
        data: ({
            course: {
                id: number;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
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
            amount: import("@prisma/client/runtime/library").Decimal;
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
            amount: import("@prisma/client/runtime/library").Decimal;
            paidForDate: Date;
            comment: string | null;
            studentId: number;
            courseId: number | null;
            receiptUrl: string | null;
        })[];
    }>;
    findOne(id: number, req: AuthenticatedRequest): Promise<{
        course: {
            id: number;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
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
        amount: import("@prisma/client/runtime/library").Decimal;
        paidForDate: Date;
        comment: string | null;
        studentId: number;
        courseId: number | null;
        receiptUrl: string | null;
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
        amount: import("@prisma/client/runtime/library").Decimal;
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
        amount: import("@prisma/client/runtime/library").Decimal;
        paidForDate: Date;
        comment: string | null;
        studentId: number;
        courseId: number | null;
        receiptUrl: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
