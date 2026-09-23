import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContactStatus } from '@prisma/client';

export class CreateContactDto {
  @ApiProperty({ example: 'Ali Vohidov', description: 'Murojaat qiluvchi ismi' })
  @IsNotEmpty({ message: 'Ism kiritish majburiy' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsNotEmpty({ message: 'Telefon raqami kiritish majburiy' })
  @IsString()
  @Matches(/^[\d\s+\-()]{7,20}$/, { message: "Telefon raqami noto'g'ri formatda" })
  phone: string;

  @ApiPropertyOptional({ example: 'ali@gmail.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: 'Front-end kursi haqida ma\'lumot olmoqchi edim' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;
}

export class UpdateContactStatusDto {
  @ApiProperty({ enum: ContactStatus, example: 'IN_PROGRESS' })
  @IsNotEmpty()
  @IsEnum(ContactStatus, { message: "Noto'g'ri status qiymati" })
  status: ContactStatus;
}

export class QueryContactDto {
  @ApiPropertyOptional({ enum: ContactStatus })
  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
