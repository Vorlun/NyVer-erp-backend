import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentType, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ description: "To'lov summasi", example: 850000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({
    description: "To'lov turi",
    enum: PaymentType,
    default: 'CASH',
  })
  @IsOptional()
  @IsEnum(PaymentType)
  type?: PaymentType;

  @ApiPropertyOptional({
    description: "To'lov statusi",
    enum: PaymentStatus,
    default: 'PAID',
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ description: "Qaysi oy uchun to'lov", example: '2026-02-01' })
  @IsNotEmpty()
  @IsDateString()
  paidForDate: string;

  @ApiPropertyOptional({ description: 'Izoh' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ description: 'Talaba ID', example: 5 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  studentId: number;
}

export class UpdatePaymentDto {
  @ApiPropertyOptional({ description: "To'lov summasi" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({ description: "To'lov turi", enum: PaymentType })
  @IsOptional()
  @IsEnum(PaymentType)
  type?: PaymentType;

  @ApiPropertyOptional({ description: "To'lov statusi", enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({ description: "Qaysi oy uchun to'lov", example: '2026-02-01' })
  @IsOptional()
  @IsDateString()
  paidForDate?: string;

  @ApiPropertyOptional({ description: 'Izoh' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ description: 'Talaba ID', example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  studentId?: number;
}

export class QueryPaymentDto {
  @ApiPropertyOptional({ description: "Talaba ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  studentId?: number;

  @ApiPropertyOptional({ description: "Status bo'yicha", enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({ description: 'Sana (dan)' })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'Sana (gacha)' })
  @IsOptional()
  @IsString()
  dateTo?: string;

  @ApiPropertyOptional({ description: 'Sahifa raqami' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @ApiPropertyOptional({ description: 'Sahifadagi elementlar soni' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @ApiPropertyOptional({ description: 'Qidiruv' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class OnlineCheckoutDto {
  @ApiProperty({ description: "Talaba to'liq ismi", example: 'Ali Vohidov' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Telefon raqami', example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Email manzili', example: 'ali@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Tanlangan kurs ID yoki nomi', example: 7 })
  @IsNotEmpty()
  courseId: number | string;

  @ApiProperty({ description: "To'lov summasi", example: 850000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({
    description: "To'lov turi",
    enum: PaymentType,
    default: 'CLICK',
  })
  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;

  @ApiPropertyOptional({ description: 'Karta raqami (oxirgi 4 raqami saqlanadi)' })
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @ApiPropertyOptional({ description: 'Izoh yoki qoshimcha ma\'lumot' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Izoh' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ description: "To'lov cheki skrinshoti yoki rasm havolasi" })
  @IsOptional()
  @IsString()
  receiptUrl?: string;
}

export class PayFromBalanceDto {
  @ApiProperty({ description: 'Talaba ID', example: 3 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  studentId: number;

  @ApiProperty({ description: 'Kurs ID', example: 7 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  courseId: number;
}

export class TopUpBalanceDto {
  @ApiProperty({ description: "Qo'shiladigan summa (so'm)", example: 500000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  amount: number;

  @ApiPropertyOptional({ description: 'Izoh' })
  @IsOptional()
  @IsString()
  comment?: string;
}

