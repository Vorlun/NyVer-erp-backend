import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CoinReason, Status } from '@prisma/client';

export class AddCoinsDto {
  @ApiProperty({ description: 'Foydalanuvchi ID', example: 5 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'Tanga miqdori (+ yoki -)', example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'Sabab',
    enum: CoinReason,
    example: 'MANUAL_ADJUSTMENT',
  })
  @IsEnum(CoinReason)
  reason: CoinReason;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreatePrizeDto {
  @ApiProperty({ description: 'Sovrin nomi', example: 'Nyver Hudisi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Rasm URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'Narxi (tangalarda)', example: 120 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  priceCoins: number;

  @ApiPropertyOptional({ description: 'Zaxira soni', default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockCount?: number;
}

export class UpdatePrizeDto {
  @ApiPropertyOptional({ description: 'Sovrin nomi' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Rasm URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Narxi (tangalarda)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  priceCoins?: number;

  @ApiPropertyOptional({ description: 'Zaxira soni' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockCount?: number;

  @ApiPropertyOptional({ description: 'Status', enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
