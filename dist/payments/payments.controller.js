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
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe, Req, ForbiddenException, BadRequestException, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto, UpdatePaymentDto, QueryPaymentDto, OnlineCheckoutDto, PayFromBalanceDto, } from './dto/create-payment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
const RECEIPT_MULTER = {
    storage: memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new BadRequestException('Faqat rasm fayllari qabul qilinadi'), false);
        }
    },
};
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async onlineCheckout(dto) {
        return this.paymentsService.processOnlineCheckout(dto);
    }
    async uploadReceipt(file, body) {
        if (file) {
            const url = this.paymentsService.saveReceiptBuffer({
                buffer: file.buffer,
                originalname: file.originalname,
            });
            return { url, success: true };
        }
        if (body?.image) {
            const url = this.paymentsService.saveBase64Receipt(body.image);
            return { url, success: true };
        }
        throw new BadRequestException("Rasm ma'lumoti kiritilmadi (fayl yoki base64)");
    }
    async approvePayment(id) {
        return this.paymentsService.approvePayment(id);
    }
    async payFromBalance(dto) {
        return this.paymentsService.payFromBalance(dto);
    }
    async findAll(query, req) {
        if (req.user.role === 'STUDENT') {
            query.studentId = req.user.id;
        }
        return this.paymentsService.findAll(query);
    }
    async getStats() {
        return this.paymentsService.getStats();
    }
    async findOne(id, req) {
        const payment = await this.paymentsService.findOne(id);
        if (req.user.role === 'STUDENT' && payment.studentId !== req.user.id) {
            throw new ForbiddenException("Siz faqat o'zingizning to'lovingizni ko'rishingiz mumkin");
        }
        return payment;
    }
    async create(dto) {
        return this.paymentsService.create(dto);
    }
    async update(id, dto) {
        return this.paymentsService.update(id, dto);
    }
    async remove(id) {
        return this.paymentsService.remove(id);
    }
};
__decorate([
    Post('online-checkout'),
    Public(),
    ApiOperation({ summary: "Landing sahifasidan onlayn to'lov qilish (JSON + base64)" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OnlineCheckoutDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "onlineCheckout", null);
__decorate([
    Post('upload-receipt'),
    Public(),
    ApiOperation({ summary: "To'lov cheki rasmini yuklash (multipart YOKI base64 JSON)" }),
    ApiConsumes('multipart/form-data', 'application/json'),
    UseInterceptors(FileInterceptor('receipt', RECEIPT_MULTER)),
    __param(0, UploadedFile()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "uploadReceipt", null);
__decorate([
    Post(':id/approve'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "To'lovni tasdiqlash, guruhga biriktirish va emailga login-parol yuborish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "approvePayment", null);
__decorate([
    Post('pay-from-balance'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({
        summary: "Talabaning balansidan kursni sotib olish — darhol enrollment va payment yaratiladi",
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PayFromBalanceDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "payFromBalance", null);
__decorate([
    Get(),
    Roles('ADMIN', 'SUPERADMIN', 'STUDENT'),
    ApiOperation({ summary: "To'lovlar tarixi" }),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findAll", null);
__decorate([
    Get('stats'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "To'lovlar statistikasi va taqsimoti" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getStats", null);
__decorate([
    Get(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'STUDENT'),
    ApiOperation({ summary: "Bitta to'lov ma'lumotlari" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Yangi to'lov kiritish (admin)" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "To'lovni yangilash" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "To'lovni o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "remove", null);
PaymentsController = __decorate([
    ApiTags('Payments'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('payments'),
    __metadata("design:paramtypes", [PaymentsService])
], PaymentsController);
export { PaymentsController };
//# sourceMappingURL=payments.controller.js.map