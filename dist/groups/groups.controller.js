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
import { GroupsService } from './groups.service.js';
import { CreateGroupDto, UpdateGroupDto, QueryGroupDto, AddStudentDto, AddTeacherDto, } from './dto/create-group.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let GroupsController = class GroupsController {
    groupsService;
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    async findAll(query) {
        return this.groupsService.findAll(query);
    }
    async findOne(id) {
        return this.groupsService.findOne(id);
    }
    async create(dto) {
        return this.groupsService.create(dto);
    }
    async update(id, dto) {
        return this.groupsService.update(id, dto);
    }
    async remove(id) {
        return this.groupsService.remove(id);
    }
    async addStudent(id, dto) {
        return this.groupsService.addStudent(id, dto);
    }
    async removeStudent(id, studentId) {
        return this.groupsService.removeStudent(id, studentId);
    }
    async addTeacher(id, dto) {
        return this.groupsService.addTeacher(id, dto);
    }
    async removeTeacher(id, teacherId) {
        return this.groupsService.removeTeacher(id, teacherId);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Barcha guruhlar ro'yxati" }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({
        summary: "Bitta guruh ma'lumotlari (talabalar, o'qituvchilar bilan)",
    }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Yangi guruh yaratish' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Guruhni yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Guruhni o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "remove", null);
__decorate([
    Post(':id/students'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Guruhga talaba qo'shish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AddStudentDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "addStudent", null);
__decorate([
    Delete(':id/students/:studentId'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Guruhdan talabani chiqarish' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('studentId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "removeStudent", null);
__decorate([
    Post(':id/teachers'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Guruhga o'qituvchi biriktirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AddTeacherDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "addTeacher", null);
__decorate([
    Delete(':id/teachers/:teacherId'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Guruhdan o'qituvchini olib tashlash" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('teacherId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "removeTeacher", null);
GroupsController = __decorate([
    ApiTags('Groups'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('groups'),
    __metadata("design:paramtypes", [GroupsService])
], GroupsController);
export { GroupsController };
//# sourceMappingURL=groups.controller.js.map