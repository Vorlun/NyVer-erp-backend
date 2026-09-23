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
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe, Req, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HomeworkService } from './homework.service.js';
import { CreateHomeworkDto, SubmitHomeworkDto, CheckSubmissionDto, } from './dto/create-homework.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let HomeworkController = class HomeworkController {
    homeworkService;
    constructor(homeworkService) {
        this.homeworkService = homeworkService;
    }
    async findAll(lessonId, groupId) {
        return this.homeworkService.findAll(lessonId ? Number(lessonId) : undefined, groupId ? Number(groupId) : undefined);
    }
    async findAllSubmissions(studentId) {
        return this.homeworkService.findAllSubmissions(studentId ? Number(studentId) : undefined);
    }
    async findOne(id) {
        return this.homeworkService.findOne(id);
    }
    async create(dto) {
        return this.homeworkService.create(dto);
    }
    async update(id, dto) {
        return this.homeworkService.update(id, dto);
    }
    async remove(id) {
        return this.homeworkService.remove(id);
    }
    async submit(id, dto, req) {
        return this.homeworkService.submit(id, req.user.id, dto);
    }
    async checkSubmission(id, dto, req) {
        return this.homeworkService.checkSubmission(id, req.user.id, dto);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Vazifalar ro'yxati" }),
    __param(0, Query('lessonId')),
    __param(1, Query('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "findAll", null);
__decorate([
    Get('submissions'),
    ApiOperation({ summary: "Barcha topshiriqlar ro'yxati (tekshirish uchun)" }),
    __param(0, Query('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "findAllSubmissions", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Bitta vazifa (submissions bilan)' }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Yangi vazifa yaratish' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateHomeworkDto]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Vazifani yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Vazifani o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "remove", null);
__decorate([
    Post(':id/submit'),
    Roles('STUDENT'),
    ApiOperation({ summary: 'Talaba topshirishi (submit)' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SubmitHomeworkDto, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "submit", null);
__decorate([
    Patch('submissions/:id/check'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Topshiriqni tekshirish va baholash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CheckSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "checkSubmission", null);
HomeworkController = __decorate([
    ApiTags('Homework'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('homework'),
    __metadata("design:paramtypes", [HomeworkService])
], HomeworkController);
export { HomeworkController };
//# sourceMappingURL=homework.controller.js.map