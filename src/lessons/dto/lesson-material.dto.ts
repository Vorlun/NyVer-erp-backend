import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLessonMaterialDto {
  @ApiProperty({ description: 'Material sarlavhasi' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Fayl URL manzili' })
  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @ApiProperty({ description: 'Fayl turi (pdf, video, docs)', required: false })
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiProperty({ description: 'Fayl hajmi (MB)', required: false })
  @IsOptional()
  @IsNumber()
  sizeMb?: number;
}

export class UpdateLessonMaterialDto extends PartialType(
  CreateLessonMaterialDto,
) {}
