var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsString, IsDateString, IsNumber, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentType, PaymentStatus } from '@prisma/client';
export class CreatePaymentDto {
    amount;
    type;
    status;
    paidForDate;
    comment;
    studentId;
}
__decorate([
    ApiProperty({ description: "To'lov summasi", example: 850000 }),
    IsNotEmpty(),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({
        description: "To'lov turi",
        enum: PaymentType,
        default: 'CASH',
    }),
    IsOptional(),
    IsEnum(PaymentType),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: "To'lov statusi",
        enum: PaymentStatus,
        default: 'PAID',
    }),
    IsOptional(),
    IsEnum(PaymentStatus),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ description: "Qaysi oy uchun to'lov", example: '2026-02-01' }),
    IsNotEmpty(),
    IsDateString(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paidForDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "comment", void 0);
__decorate([
    ApiProperty({ description: 'Talaba ID', example: 5 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "studentId", void 0);
export class UpdatePaymentDto {
    amount;
    type;
    status;
    paidForDate;
    comment;
    studentId;
}
__decorate([
    ApiPropertyOptional({ description: "To'lov summasi" }),
    IsOptional(),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({ description: "To'lov turi", enum: PaymentType }),
    IsOptional(),
    IsEnum(PaymentType),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ description: "To'lov statusi", enum: PaymentStatus }),
    IsOptional(),
    IsEnum(PaymentStatus),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: "Qaysi oy uchun to'lov", example: '2026-02-01' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "paidForDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "comment", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Talaba ID', example: 5 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "studentId", void 0);
export class QueryPaymentDto {
    studentId;
    status;
    dateFrom;
    dateTo;
    page;
    limit;
    search;
}
__decorate([
    ApiPropertyOptional({ description: "Talaba ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryPaymentDto.prototype, "studentId", void 0);
__decorate([
    ApiPropertyOptional({ description: "Status bo'yicha", enum: PaymentStatus }),
    IsOptional(),
    IsEnum(PaymentStatus),
    __metadata("design:type", String)
], QueryPaymentDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sana (dan)' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryPaymentDto.prototype, "dateFrom", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sana (gacha)' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryPaymentDto.prototype, "dateTo", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sahifa raqami' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryPaymentDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sahifadagi elementlar soni' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryPaymentDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Qidiruv' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryPaymentDto.prototype, "search", void 0);
export class OnlineCheckoutDto {
    fullName;
    phone;
    email;
    courseId;
    amount;
    paymentType;
    cardNumber;
    notes;
    comment;
    receiptUrl;
}
__decorate([
    ApiProperty({ description: "Talaba to'liq ismi", example: 'Ali Vohidov' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ description: 'Telefon raqami', example: '+998901234567' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: 'Email manzili', example: 'ali@gmail.com' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: 'Tanlangan kurs ID yoki nomi', example: 7 }),
    IsNotEmpty(),
    __metadata("design:type", Object)
], OnlineCheckoutDto.prototype, "courseId", void 0);
__decorate([
    ApiProperty({ description: "To'lov summasi", example: 850000 }),
    IsNotEmpty(),
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], OnlineCheckoutDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({
        description: "To'lov turi",
        enum: PaymentType,
        default: 'CLICK',
    }),
    IsOptional(),
    IsEnum(PaymentType),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "paymentType", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Karta raqami (oxirgi 4 raqami saqlanadi)' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "cardNumber", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh yoki qoshimcha ma\'lumot' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "comment", void 0);
__decorate([
    ApiPropertyOptional({ description: "To'lov cheki skrinshoti yoki rasm havolasi" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OnlineCheckoutDto.prototype, "receiptUrl", void 0);
export class PayFromBalanceDto {
    studentId;
    courseId;
}
__decorate([
    ApiProperty({ description: 'Talaba ID', example: 3 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], PayFromBalanceDto.prototype, "studentId", void 0);
__decorate([
    ApiProperty({ description: 'Kurs ID', example: 7 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], PayFromBalanceDto.prototype, "courseId", void 0);
export class TopUpBalanceDto {
    amount;
    comment;
}
__decorate([
    ApiProperty({ description: "Qo'shiladigan summa (so'm)", example: 500000 }),
    IsNotEmpty(),
    Type(() => Number),
    IsNumber(),
    Min(1000),
    __metadata("design:type", Number)
], TopUpBalanceDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TopUpBalanceDto.prototype, "comment", void 0);
//# sourceMappingURL=create-payment.dto.js.map