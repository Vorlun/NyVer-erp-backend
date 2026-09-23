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
import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseIntPipe, Req, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service.js';
import { AddCoinsDto, CreatePrizeDto, UpdatePrizeDto, } from './dto/gamification.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let GamificationController = class GamificationController {
    gamificationService;
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    async getBalance(userId) {
        return this.gamificationService.getBalance(userId);
    }
    async getTransactions(userId) {
        return this.gamificationService.getTransactions(userId ? Number(userId) : undefined);
    }
    async addCoins(dto) {
        return this.gamificationService.addCoins(dto);
    }
    async findAllPrizes() {
        return this.gamificationService.findAllPrizes();
    }
    async createPrize(dto) {
        return this.gamificationService.createPrize(dto);
    }
    async updatePrize(id, dto) {
        return this.gamificationService.updatePrize(id, dto);
    }
    async buyPrize(id, req) {
        return this.gamificationService.buyPrize(id, req.user.id);
    }
    async getOrders(studentId) {
        return this.gamificationService.getOrders(studentId ? Number(studentId) : undefined);
    }
    async markAsGiven(id) {
        return this.gamificationService.markOrderAsGiven(id);
    }
};
__decorate([
    Get('balance/:userId'),
    ApiOperation({ summary: 'Foydalanuvchi tanga balansi' }),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getBalance", null);
__decorate([
    Get('transactions'),
    ApiOperation({ summary: 'Tanga tranzaksiyalari tarixi' }),
    __param(0, Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getTransactions", null);
__decorate([
    Post('coins/add'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Foydalanuvchiga tanga qo'shish/ayirish" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddCoinsDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "addCoins", null);
__decorate([
    Get('prizes'),
    ApiOperation({ summary: "Sovrinlar ro'yxati" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "findAllPrizes", null);
__decorate([
    Post('prizes'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Yangi sovrin qo'shish" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePrizeDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "createPrize", null);
__decorate([
    Patch('prizes/:id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Sovrinni yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePrizeDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "updatePrize", null);
__decorate([
    Post('prizes/:id/buy'),
    Roles('STUDENT'),
    ApiOperation({ summary: 'Sovrin sotib olish (Student)' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "buyPrize", null);
__decorate([
    Get('orders'),
    ApiOperation({ summary: 'Sovrin buyurtmalari tarixi' }),
    __param(0, Query('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getOrders", null);
__decorate([
    Patch('orders/:id/give'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Sovrinni topshirildi deb belgilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "markAsGiven", null);
GamificationController = __decorate([
    ApiTags('Gamification'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('gamification'),
    __metadata("design:paramtypes", [GamificationService])
], GamificationController);
export { GamificationController };
//# sourceMappingURL=gamification.controller.js.map