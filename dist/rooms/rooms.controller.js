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
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoomsService } from './rooms.service.js';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let RoomsController = class RoomsController {
    roomsService;
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async findAll() {
        return this.roomsService.findAll();
    }
    async findOne(id) {
        return this.roomsService.findOne(id);
    }
    async create(dto) {
        return this.roomsService.create(dto);
    }
    async update(id, dto) {
        return this.roomsService.update(id, dto);
    }
    async remove(id) {
        return this.roomsService.remove(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Barcha xonalar ro'yxati" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: "Bitta xona ma'lumotlari" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Yangi xona yaratish' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Xonani yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Xonani o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "remove", null);
RoomsController = __decorate([
    ApiTags('Rooms'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('rooms'),
    __metadata("design:paramtypes", [RoomsService])
], RoomsController);
export { RoomsController };
//# sourceMappingURL=rooms.controller.js.map