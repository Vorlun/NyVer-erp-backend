import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsArray,
  IsDateString,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLessonTeacherDto {
  @ApiProperty({ description: 'Dars mavzusi', example: '1-Dars: HTML & CSS asoslari' })
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiPropertyOptional({ description: 'Video darslik havolasi (YouTube / havola)', example: 'https://youtu.be/...' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Dars matni va ko\'rsatmalar' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Biriktirilgan fayllar ro\'yxati', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachedFiles?: string[];

  @ApiPropertyOptional({ description: 'Uy vazifasi sharti / topshiriq', example: 'Flexbox yordamida responsive layout yarating' })
  @IsOptional()
  @IsString()
  homeworkTask?: string;

  @ApiPropertyOptional({ description: 'Dars tartib raqami' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonOrder?: number;

  @ApiPropertyOptional({ description: 'Dars o\'tiladigan sana (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  lessonDate?: string;

  @ApiPropertyOptional({ description: 'Boshlanish vaqti', example: '14:00' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ description: 'Tugash vaqti', example: '16:00' })
  @IsOptional()
  @IsString()
  endTime?: string;
}

export class GradeSubmissionDto {
  @ApiProperty({ description: 'Baholash bali (0 - 100)', example: 95 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @ApiPropertyOptional({ description: 'Mentor izohi (feedback)', example: 'Barakalla, kod juda toza!' })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiPropertyOptional({ description: 'Rag\'batlantiruvchi tangalar soni', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coinsEarned?: number;

  @ApiPropertyOptional({ description: 'Holati', enum: ['CHECKED', 'ACCEPTED', 'REJECTED'] })
  @IsOptional()
  @IsIn(['CHECKED', 'ACCEPTED', 'REJECTED'])
  status?: 'CHECKED' | 'ACCEPTED' | 'REJECTED';
}

export class CreateTeacherHomeworkDto {
  @ApiProperty({ description: 'Vazifa mavzusi / sarlavhasi', example: 'Flexbox va Grid layout topshirig\'i' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Vazifa sharti va talablari', example: 'Flexbox orqali navbar va hero qismini quring' })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiPropertyOptional({ description: 'Dars ID (agar mavjud darsga biriktirilsa)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  lessonId?: number;

  @ApiPropertyOptional({ description: 'Maksimal ball', default: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxScore?: number;

  @ApiPropertyOptional({ description: 'Tanga mukofoti (Coins)', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxCoins?: number;

  @ApiPropertyOptional({ description: 'Topshirish muddati (deadline)' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ description: 'Biriktirilgan fayllar', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fileUrls?: string[];
}

