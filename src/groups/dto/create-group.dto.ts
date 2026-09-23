import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
  IsBoolean,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupStatus, WeekDay } from '@prisma/client';

export class CreateGroupDto {
  @ApiProperty({ description: 'Guruh nomi', example: 'FE-201' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Boshlanish sanasi', example: '2026-02-01' })
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ApiPropertyOptional({ description: 'Tugash sanasi', example: '2026-06-01' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ description: 'Dars boshlanish vaqti', example: '14:00' })
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty({ description: 'Dars tugash vaqti', example: '16:00' })
  @IsNotEmpty()
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ description: 'Maksimal talabalar soni', default: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxStudents?: number;

  @ApiProperty({
    description: 'Dars kunlari',
    example: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    enum: WeekDay,
    isArray: true,
  })
  @IsArray()
  @IsEnum(WeekDay, { each: true })
  weekDays: WeekDay[];

  @ApiProperty({ description: 'Kurs ID', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  courseId: number;

  @ApiProperty({ description: 'Xona ID', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  roomId: number;

  @ApiPropertyOptional({ description: 'Ustoz ID', example: 19 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;
}

export class UpdateGroupDto {
  @ApiPropertyOptional({ description: 'Guruh nomi' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Boshlanish sanasi' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Tugash sanasi' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Dars boshlanish vaqti' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ description: 'Dars tugash vaqti' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({ description: 'Maksimal talabalar soni' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxStudents?: number;

  @ApiPropertyOptional({
    description: 'Dars kunlari',
    enum: WeekDay,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(WeekDay, { each: true })
  weekDays?: WeekDay[];

  @ApiPropertyOptional({ description: 'Status', enum: GroupStatus })
  @IsOptional()
  @IsEnum(GroupStatus)
  status?: GroupStatus;

  @ApiPropertyOptional({ description: 'Xona ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  roomId?: number;

  @ApiPropertyOptional({ description: 'Kurs ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  courseId?: number;

  @ApiPropertyOptional({ description: "O'qituvchi (Mentor) ID" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;
}

export class QueryGroupDto {
  @ApiPropertyOptional({ description: "Kurs ID bo'yicha filtrlash" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  courseId?: number;

  @ApiPropertyOptional({ description: "Status bo'yicha", enum: GroupStatus })
  @IsOptional()
  @IsEnum(GroupStatus)
  status?: GroupStatus;

  @ApiPropertyOptional({ description: "O'qituvchi ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;
}

export class AddStudentDto {
  @ApiProperty({ description: 'Talaba ID', example: 5 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  studentId: number;
}

export class AddTeacherDto {
  @ApiProperty({ description: "O'qituvchi ID", example: 3 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  teacherId: number;

  @ApiPropertyOptional({ description: "Asosiy o'qituvchimi?", default: true })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}
