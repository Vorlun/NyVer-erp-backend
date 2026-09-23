import {
  IsInt,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AttendanceStatus } from '@prisma/client';

export class AttendanceRecordDto {
  @ApiProperty({ description: 'Talaba ID', example: 5 })
  @IsInt()
  @Type(() => Number)
  studentId: number;

  @ApiProperty({
    description: 'Davomat statusi',
    enum: AttendanceStatus,
    example: 'PRESENT',
  })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiPropertyOptional({ description: 'Mukofot tanga', default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coinsEarned?: number;

  @ApiPropertyOptional({ description: 'Izoh' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class BulkAttendanceDto {
  @ApiProperty({ description: 'Dars ID', example: 1 })
  @IsInt()
  @Type(() => Number)
  lessonId: number;

  @ApiProperty({
    description: 'Davomat yozuvlari',
    type: [AttendanceRecordDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}

export class QueryAttendanceDto {
  @ApiPropertyOptional({ description: "Dars ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  lessonId?: number;

  @ApiPropertyOptional({ description: "Talaba ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  studentId?: number;

  @ApiPropertyOptional({ description: "Guruh ID bo'yicha" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  groupId?: number;
}
