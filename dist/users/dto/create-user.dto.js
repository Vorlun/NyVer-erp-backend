var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsEmail, MinLength, IsDateString, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
export class CreateUserDto {
    firstName;
    lastName;
    role;
    phone;
    email;
    password;
    birthDate;
    address;
    photo;
}
__decorate([
    ApiProperty({ description: 'Ism', example: 'Jasur' }),
    IsNotEmpty({ message: "Ism bo'sh bo'lmasligi kerak" }),
    IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty({ description: 'Familiya', example: 'Bekmirzayev' }),
    IsNotEmpty({ message: "Familiya bo'sh bo'lmasligi kerak" }),
    IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty({ description: 'Rol', enum: Role, example: 'STUDENT' }),
    IsEnum(Role, { message: "Noto'g'ri rol" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    ApiProperty({ description: 'Telefon raqami', example: '+998901234567' }),
    IsNotEmpty({ message: "Telefon raqami bo'sh bo'lmasligi kerak" }),
    IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Email', example: 'user@nyver.uz' }),
    IsOptional(),
    IsEmail({}, { message: "Noto'g'ri email formati" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: 'Parol (kamida 6 belgi)', example: '123456' }),
    IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak" }),
    IsString(),
    MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    ApiPropertyOptional({ description: "Tug'ilgan sana", example: '2000-01-15' }),
    IsOptional(),
    IsDateString({}, { message: "Noto'g'ri sana formati" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Manzil',
        example: 'Toshkent sh., Yunusobod tumani',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rasm URL' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
//# sourceMappingURL=create-user.dto.js.map