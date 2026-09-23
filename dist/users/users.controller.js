var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUserDto } from './dto/query-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ChangeStatusDto } from './dto/change-status.dto.js';
import { TopUpBalanceDto } from '../payments/dto/create-payment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(query) {
        return this.usersService.findAll(query);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async create(dto) {
        return this.usersService.create(dto);
    }
    async update(id, dto) {
        return this.usersService.update(id, dto);
    }
    async changeStatus(id, dto) {
        return this.usersService.changeStatus(id, dto);
    }
    async changePassword(id, dto) {
        return this.usersService.changePassword(id, dto);
    }
    async topUpBalance(id, dto) {
        return this.usersService.topUpBalance(id, dto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
};
__decorate([
    Get(),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxati" }),
    ApiResponse({
        status: 200,
        description: "Foydalanuvchilar ro'yxati (pagination bilan)",
    }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Bitta foydalanuvchi ma'lumotlari" }),
    ApiResponse({ status: 200, description: 'Foydalanuvchi topildi' }),
    ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (faqat Admin)' }),
    ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' }),
    ApiResponse({ status: 409, description: 'Telefon/email allaqachon mavjud' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Foydalanuvchini yangilash' }),
    ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi' }),
    ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    Patch(':id/status'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Foydalanuvchi statusini o'zgartirish" }),
    ApiResponse({ status: 200, description: "Status o'zgartirildi" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ChangeStatusDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeStatus", null);
__decorate([
    Patch(':id/password'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Foydalanuvchi parolini o'zgartirish" }),
    ApiResponse({ status: 200, description: "Parol o'zgartirildi" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    Post(':id/balance/top-up'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Foydalanuvchi balansiga pul qo'shish (Admin)" }),
    ApiResponse({ status: 200, description: 'Balans yangilandi' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, TopUpBalanceDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "topUpBalance", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Foydalanuvchini o'chirish" }),
    ApiResponse({ status: 200, description: "Foydalanuvchi o'chirildi" }),
    ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    ApiTags('Users'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('users'),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map