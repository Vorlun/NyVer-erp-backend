import { PaymentType, PaymentStatus } from '@prisma/client';
export declare class CreatePaymentDto {
    amount: number;
    type?: PaymentType;
    status?: PaymentStatus;
    paidForDate: string;
    comment?: string;
    studentId: number;
}
export declare class UpdatePaymentDto {
    amount?: number;
    type?: PaymentType;
    status?: PaymentStatus;
    paidForDate?: string;
    comment?: string;
    studentId?: number;
}
export declare class QueryPaymentDto {
    studentId?: number;
    status?: PaymentStatus;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
    search?: string;
}
export declare class OnlineCheckoutDto {
    fullName: string;
    phone: string;
    email: string;
    courseId: number | string;
    amount: number;
    paymentType?: PaymentType;
    cardNumber?: string;
    notes?: string;
    comment?: string;
    receiptUrl?: string;
}
export declare class PayFromBalanceDto {
    studentId: number;
    courseId: number;
}
export declare class TopUpBalanceDto {
    amount: number;
    comment?: string;
}
