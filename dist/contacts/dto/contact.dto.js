var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsInt, MinLength, MaxLength, Matches, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContactStatus } from '@prisma/client';
export class CreateContactDto {
    name;
    phone;
    email;
    message;
}
__decorate([
    ApiProperty({ example: 'Ali Vohidov', description: 'Murojaat qiluvchi ismi' }),
    IsNotEmpty({ message: 'Ism kiritish majburiy' }),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], CreateContactDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: '+998901234567', description: 'Telefon raqami' }),
    IsNotEmpty({ message: 'Telefon raqami kiritish majburiy' }),
    IsString(),
    Matches(/^[\d\s+\-()]{7,20}$/, { message: "Telefon raqami noto'g'ri formatda" }),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'ali@gmail.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Front-end kursi haqida ma\'lumot olmoqchi edim' }),
    IsOptional(),
    IsString(),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateContactDto.prototype, "message", void 0);
export class UpdateContactStatusDto {
    status;
}
__decorate([
    ApiProperty({ enum: ContactStatus, example: 'IN_PROGRESS' }),
    IsNotEmpty(),
    IsEnum(ContactStatus, { message: "Noto'g'ri status qiymati" }),
    __metadata("design:type", String)
], UpdateContactStatusDto.prototype, "status", void 0);
export class QueryContactDto {
    status;
    page = 1;
    limit = 20;
    search;
}
__decorate([
    ApiPropertyOptional({ enum: ContactStatus }),
    IsOptional(),
    IsEnum(ContactStatus),
    __metadata("design:type", String)
], QueryContactDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ default: 1 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryContactDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ default: 20 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryContactDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryContactDto.prototype, "search", void 0);
//# sourceMappingURL=contact.dto.js.map