var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsEnum, IsString, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Role, Status } from '@prisma/client';
export class QueryUserDto {
    role;
    status;
    search;
    page = 1;
    limit = 20;
}
__decorate([
    ApiPropertyOptional({ description: "Rol bo'yicha filtrlash", enum: Role }),
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", String)
], QueryUserDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional({
        description: "Status bo'yicha filtrlash",
        enum: Status,
    }),
    IsOptional(),
    IsEnum(Status),
    __metadata("design:type", String)
], QueryUserDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({
        description: "Ism, familiya yoki telefon bo'yicha qidirish",
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryUserDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sahifa raqami', default: 1 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], QueryUserDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Sahifadagi elementlar soni',
        default: 20,
    }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], QueryUserDto.prototype, "limit", void 0);
//# sourceMappingURL=query-user.dto.js.map