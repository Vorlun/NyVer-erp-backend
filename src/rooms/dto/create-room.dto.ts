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

export class CreateRoomDto {
  @ApiProperty({ description: 'Xona nomi', example: 'Xona #101' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "Sig'imi (o'rinlar soni)", example: 16 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity: number;
}

export class UpdateRoomDto {
  @ApiPropertyOptional({ description: 'Xona nomi' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: "Sig'imi" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({ description: 'Status', enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
