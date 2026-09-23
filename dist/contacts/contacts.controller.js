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
import { ContactsService } from './contacts.service.js';
import { CreateContactDto, UpdateContactStatusDto, QueryContactDto, } from './dto/contact.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
let ContactsController = class ContactsController {
    contactsService;
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    async create(dto) {
        return this.contactsService.create(dto);
    }
    async findAll(query) {
        return this.contactsService.findAll(query);
    }
    async updateStatus(id, dto) {
        return this.contactsService.updateStatus(id, dto);
    }
    async remove(id) {
        return this.contactsService.remove(id);
    }
};
__decorate([
    Post(),
    Public(),
    ApiOperation({ summary: 'Murojaat yuborish (Ommaviy endpoint)' }),
    ApiResponse({ status: 201, description: 'Murojaat qabul qilindi' }),
    ApiResponse({ status: 400, description: "Validatsiya xatoligi — ism va telefon to'ldirilishi shart" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    Get(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiBearerAuth(),
    ApiOperation({ summary: "Barcha murojaatlar ro'yxati (Admin)" }),
    ApiResponse({ status: 200, description: 'Murojaatlar va statistika' }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryContactDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findAll", null);
__decorate([
    Patch(':id/status'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiBearerAuth(),
    ApiOperation({ summary: "Murojaat statusini o'zgartirish (Admin)" }),
    ApiResponse({ status: 200, description: 'Status yangilandi' }),
    ApiResponse({ status: 404, description: 'Murojaat topilmadi' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateContactStatusDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "updateStatus", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiBearerAuth(),
    ApiOperation({ summary: "Murojaatni o'chirish (Admin)" }),
    ApiResponse({ status: 200, description: "Murojaat o'chirildi" }),
    ApiResponse({ status: 404, description: 'Murojaat topilmadi' }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "remove", null);
ContactsController = __decorate([
    ApiTags('Contacts'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('contacts'),
    __metadata("design:paramtypes", [ContactsService])
], ContactsController);
export { ContactsController };
//# sourceMappingURL=contacts.controller.js.map