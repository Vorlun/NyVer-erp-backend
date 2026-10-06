import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoursePlanLessonDto {
  @ApiProperty({ description: 'Dars tartib raqami' })
  @IsNotEmpty()
  @IsNumber()
  lessonOrder: number;

  @ApiProperty({ description: 'Mavzu nomi' })
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiProperty({ description: 'Tavsif', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateCoursePlanDto {
  @ApiProperty({
    description: "O'quv reja nomi (masalan: Standart 2026, Intensiv Bootcamp)",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Tavsif', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Birlamchi (asosiy) reja qilib belgilash',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiProperty({
    description: "Darslar ro'yxati",
    type: [CoursePlanLessonDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoursePlanLessonDto)
  lessons?: CoursePlanLessonDto[];
}

export class UpdateCoursePlanDto extends PartialType(CreateCoursePlanDto) {}
