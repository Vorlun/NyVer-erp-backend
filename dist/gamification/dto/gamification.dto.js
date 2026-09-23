var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsOptional, IsInt, IsString, IsEnum, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CoinReason, Status } from '@prisma/client';
export class AddCoinsDto {
    userId;
    amount;
    reason;
    description;
}
__decorate([
    ApiProperty({ description: 'Foydalanuvchi ID', example: 5 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], AddCoinsDto.prototype, "userId", void 0);
__decorate([
    ApiProperty({ description: 'Tanga miqdori (+ yoki -)', example: 10 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], AddCoinsDto.prototype, "amount", void 0);
__decorate([
    ApiProperty({
        description: 'Sabab',
        enum: CoinReason,
        example: 'MANUAL_ADJUSTMENT',
    }),
    IsEnum(CoinReason),
    __metadata("design:type", String)
], AddCoinsDto.prototype, "reason", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AddCoinsDto.prototype, "description", void 0);
export class CreatePrizeDto {
    name;
    description;
    imageUrl;
    priceCoins;
    stockCount;
}
__decorate([
    ApiProperty({ description: 'Sovrin nomi', example: 'Nyver Hudisi' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreatePrizeDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePrizeDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rasm URL' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePrizeDto.prototype, "imageUrl", void 0);
__decorate([
    ApiProperty({ description: 'Narxi (tangalarda)', example: 120 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreatePrizeDto.prototype, "priceCoins", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Zaxira soni', default: 0 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreatePrizeDto.prototype, "stockCount", void 0);
export class UpdatePrizeDto {
    name;
    description;
    imageUrl;
    priceCoins;
    stockCount;
    status;
}
__decorate([
    ApiPropertyOptional({ description: 'Sovrin nomi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePrizeDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePrizeDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rasm URL' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePrizeDto.prototype, "imageUrl", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Narxi (tangalarda)' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdatePrizeDto.prototype, "priceCoins", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Zaxira soni' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], UpdatePrizeDto.prototype, "stockCount", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Status', enum: Status }),
    IsOptional(),
    IsEnum(Status),
    __metadata("design:type", String)
], UpdatePrizeDto.prototype, "status", void 0);
//# sourceMappingURL=gamification.dto.js.map