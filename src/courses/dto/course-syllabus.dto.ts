import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseSyllabusDto {
  @ApiProperty({ description: 'Dars tartib raqami' })
  @IsNotEmpty()
  @IsNumber()
  lessonOrder: number;

  @ApiProperty({ description: 'Mavzu' })
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiProperty({ description: 'Tavsif', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCourseSyllabusDto extends PartialType(
  CreateCourseSyllabusDto,
) {}
