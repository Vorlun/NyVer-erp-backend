import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsArray,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHomeworkDto {
  @ApiProperty({ description: 'Vazifa sarlavhasi', example: 'Vue 3 Todo App' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Vazifa matni' })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiPropertyOptional({ description: 'Fayl URL lari', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fileUrls?: string[];

  @ApiPropertyOptional({ description: 'Maksimal ball', default: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxScore?: number;

  @ApiPropertyOptional({ description: 'Maksimal tanga (coin)', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxCoins?: number;

  @ApiPropertyOptional({ description: 'Muddat (deadline)' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({ description: 'Dars ID', example: 3 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  lessonId: number;
}

export class SubmitHomeworkDto {
  @ApiPropertyOptional({ description: 'Matnli javob' })
  @IsOptional()
  @IsString()
  textAnswer?: string;

  @ApiPropertyOptional({ description: 'Fayl URL lari', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fileUrls?: string[];
}

export class CheckSubmissionDto {
  @ApiProperty({ description: 'Ball (0 dan maxScore gacha)', example: 85 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @ApiPropertyOptional({ description: 'Mukofot tangalar', default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coinsEarned?: number;

  @ApiPropertyOptional({ description: "O'qituvchi izohi (feedback)" })
  @IsOptional()
  @IsString()
  feedback?: string;
}
