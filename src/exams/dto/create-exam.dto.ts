import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ description: 'Imtihon sarlavhasi' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Imtihon sanasi',
    example: '2023-12-01T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  examDate: string;

  @ApiProperty({ description: 'Maksimal ball', default: 100 })
  @IsOptional()
  @IsNumber()
  maxScore?: number;

  @ApiProperty({ description: 'Guruh ID' })
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}

export class UpdateExamDto extends PartialType(CreateExamDto) {}

export class ExamResultDto {
  @ApiProperty({ description: 'Talaba ID' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: "To'plagan bali" })
  @IsNotEmpty()
  @IsNumber()
  score: number;
}
