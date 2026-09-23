var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsEnum, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';
export class CreateCourseDto {
    name;
    description;
    price;
    durationMonths;
    lessonsPerMonth;
    totalLessons;
}
__decorate([
    ApiProperty({ description: 'Kurs nomi', example: 'Frontend Dasturlash' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ description: "Narxi (so'mda)", example: 850000 }),
    IsNotEmpty(),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Davomiyligi (oy)', default: 1 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "durationMonths", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Oylik darslar soni', default: 12 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "lessonsPerMonth", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Jami darslar soni', default: 12 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "totalLessons", void 0);
export class UpdateCourseDto {
    name;
    description;
    price;
    durationMonths;
    lessonsPerMonth;
    totalLessons;
    status;
}
__decorate([
    ApiPropertyOptional({ description: 'Kurs nomi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Narxi' }),
    IsOptional(),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "price", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Davomiyligi (oy)' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "durationMonths", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Oylik darslar soni' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "lessonsPerMonth", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Jami darslar soni' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "totalLessons", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Status', enum: Status }),
    IsOptional(),
    IsEnum(Status),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "status", void 0);
//# sourceMappingURL=create-course.dto.js.map