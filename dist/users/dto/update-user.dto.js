var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, IsEmail, IsEnum, IsDateString, } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
export class UpdateUserDto {
    firstName;
    lastName;
    role;
    phone;
    email;
    birthDate;
    address;
    photo;
}
__decorate([
    ApiPropertyOptional({ description: 'Ism', example: 'Jasur' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Familiya', example: 'Bekmirzayev' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rol', enum: Role }),
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Telefon raqami',
        example: '+998901234567',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Email', example: 'user@nyver.uz' }),
    IsOptional(),
    IsEmail({}, { message: "Noto'g'ri email formati" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ description: "Tug'ilgan sana", example: '2000-01-15' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "birthDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Manzil' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rasm URL' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "photo", void 0);
//# sourceMappingURL=update-user.dto.js.map