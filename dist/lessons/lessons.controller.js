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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LessonsService } from './lessons.service.js';
import { CreateLessonDto, UpdateLessonDto, QueryLessonDto, } from './dto/create-lesson.dto.js';
import { CreateLessonMaterialDto, UpdateLessonMaterialDto, } from './dto/lesson-material.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let LessonsController = class LessonsController {
    lessonsService;
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    async findAll(query) {
        return this.lessonsService.findAll(query);
    }
    async findOne(id) {
        return this.lessonsService.findOne(id);
    }
    async create(dto) {
        return this.lessonsService.create(dto);
    }
    async update(id, dto) {
        return this.lessonsService.update(id, dto);
    }
    async remove(id) {
        return this.lessonsService.remove(id);
    }
    async addMaterial(lessonId, dto) {
        return this.lessonsService.addMaterial(lessonId, dto);
    }
    async updateMaterial(lessonId, materialId, dto) {
        return this.lessonsService.updateMaterial(lessonId, materialId, dto);
    }
    async removeMaterial(lessonId, materialId) {
        return this.lessonsService.removeMaterial(lessonId, materialId);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Darslar ro'yxati (filtrlash mumkin)" }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({
        summary: "Bitta dars ma'lumotlari (attendance, homework bilan)",
    }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Yangi dars yaratish' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Darsni yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Darsni o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "remove", null);
__decorate([
    Post(':id/materials'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Darsga material (fayl) qo'shish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateLessonMaterialDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "addMaterial", null);
__decorate([
    Patch(':id/materials/:materialId'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Dars materialini yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('materialId', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, UpdateLessonMaterialDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "updateMaterial", null);
__decorate([
    Delete(':id/materials/:materialId'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Dars materialini o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('materialId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "removeMaterial", null);
LessonsController = __decorate([
    ApiTags('Lessons'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('lessons'),
    __metadata("design:paramtypes", [LessonsService])
], LessonsController);
export { LessonsController };
//# sourceMappingURL=lessons.controller.js.map