import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  MinLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'Ism', example: 'Jasur' })
  @IsNotEmpty({ message: "Ism bo'sh bo'lmasligi kerak" })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Familiya', example: 'Bekmirzayev' })
  @IsNotEmpty({ message: "Familiya bo'sh bo'lmasligi kerak" })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Rol', enum: Role, example: 'STUDENT' })
  @IsEnum(Role, { message: "Noto'g'ri rol" })
  role: Role;

  @ApiProperty({ description: 'Telefon raqami', example: '+998901234567' })
  @IsNotEmpty({ message: "Telefon raqami bo'sh bo'lmasligi kerak" })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: 'Email', example: 'user@nyver.uz' })
  @IsOptional()
  @IsEmail({}, { message: "Noto'g'ri email formati" })
  email?: string;

  @ApiProperty({ description: 'Parol (kamida 6 belgi)', example: '123456' })
  @IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak" })
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  password: string;

  @ApiPropertyOptional({ description: "Tug'ilgan sana", example: '2000-01-15' })
  @IsOptional()
  @IsDateString({}, { message: "Noto'g'ri sana formati" })
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'Manzil',
    example: 'Toshkent sh., Yunusobod tumani',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Rasm URL' })
  @IsOptional()
  @IsString()
  photo?: string;
}
