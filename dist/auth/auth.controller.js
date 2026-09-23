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
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { SetPasswordDto } from './dto/set-password.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto) {
        return this.authService.login(dto);
    }
    async refresh(dto) {
        return this.authService.refreshToken(dto.refreshToken);
    }
    async setPassword(dto) {
        return this.authService.setPassword(dto);
    }
    async getProfile(req) {
        return this.authService.getProfile(req.user.id);
    }
};
__decorate([
    Post('login'),
    ApiOperation({ summary: 'Tizimga kirish (Login)' }),
    ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirish' }),
    ApiResponse({ status: 401, description: "Login yoki parol noto'g'ri" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('refresh'),
    ApiOperation({ summary: 'Access tokenni yangilash (Refresh)' }),
    ApiResponse({ status: 200, description: 'Yangi tokenlar qaytarildi' }),
    ApiResponse({ status: 401, description: 'Refresh token yaroqsiz' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Post('set-password'),
    ApiOperation({ summary: 'Taklif linki orqali parolni o\'rnatish' }),
    ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli o\'rnatildi' }),
    ApiResponse({ status: 400, description: 'Token yaroqsiz yoki muddati o\'tgan' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Joriy foydalanuvchi profili (Me)' }),
    ApiResponse({ status: 200, description: 'Foydalanuvchi profili' }),
    ApiResponse({ status: 401, description: 'Avtorizatsiya kerak' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    ApiTags('Auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map