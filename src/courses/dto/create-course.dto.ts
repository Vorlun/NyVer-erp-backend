import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class CreateCourseDto {
  @ApiProperty({ description: 'Kurs nomi', example: 'Frontend Dasturlash' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Narxi (so'mda)", example: 850000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Davomiyligi (oy)', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @ApiPropertyOptional({ description: 'Oylik darslar soni', default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonsPerMonth?: number;

  @ApiPropertyOptional({ description: 'Jami darslar soni', default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalLessons?: number;
}

export class UpdateCourseDto {
  @ApiPropertyOptional({ description: 'Kurs nomi' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Narxi' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ description: 'Davomiyligi (oy)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @ApiPropertyOptional({ description: 'Oylik darslar soni' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonsPerMonth?: number;

  @ApiPropertyOptional({ description: 'Jami darslar soni' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalLessons?: number;

  @ApiPropertyOptional({ description: 'Status', enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
