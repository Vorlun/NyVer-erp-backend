import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class CreateLessonDto {
  @ApiProperty({ description: 'Dars raqami (tartib)', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonOrder: number;

  @ApiProperty({ description: 'Dars mavzusi', example: 'HTML5 Semantic' })
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Video darslik havolasi (YouTube, Vimeo, mp4)', example: 'https://youtube.com/watch?v=xyz' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Dars matni va batafsil mazmuni' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Dars sanasi', example: '2026-02-02' })
  @IsNotEmpty()
  @IsString()
  lessonDate: string;

  @ApiPropertyOptional({ description: 'Boshlanish vaqti', example: '14:00' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ description: 'Tugash vaqti', example: '16:00' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty({ description: 'Guruh ID', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  groupId: number;

  @ApiPropertyOptional({ description: "O'qituvchi ID" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;

  @ApiPropertyOptional({ description: 'Xona ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  roomId?: number;
}

export class UpdateLessonDto {
  @ApiPropertyOptional({ description: 'Dars mavzusi' })
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Video darslik havolasi' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Dars matni va batafsil mazmuni' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Dars sanasi' })
  @IsOptional()
  @IsString()
  lessonDate?: string;

  @ApiPropertyOptional({ description: 'Boshlanish vaqti' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ description: 'Tugash vaqti' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({ description: "O'qituvchi ID" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;

  @ApiPropertyOptional({ description: 'Xona ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  roomId?: number;

  @ApiPropertyOptional({ description: 'Status', enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

export class QueryLessonDto {
  @ApiPropertyOptional({ description: "Guruh ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  groupId?: number;

  @ApiPropertyOptional({ description: "O'qituvchi ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  teacherId?: number;

  @ApiPropertyOptional({ description: 'Sana (dan)', example: '2026-02-01' })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'Sana (gacha)', example: '2026-02-28' })
  @IsOptional()
  @IsString()
  dateTo?: string;
}
