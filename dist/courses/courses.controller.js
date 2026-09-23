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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, } from '@nestjs/swagger';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto.js';
import { CreateCourseSyllabusDto, UpdateCourseSyllabusDto, } from './dto/course-syllabus.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let CoursesController = class CoursesController {
    coursesService;
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async findAll() {
        return this.coursesService.findAll();
    }
    async findOne(id) {
        return this.coursesService.findOne(id);
    }
    async create(dto) {
        return this.coursesService.create(dto);
    }
    async update(id, dto) {
        return this.coursesService.update(id, dto);
    }
    async remove(id) {
        return this.coursesService.remove(id);
    }
    async addSyllabus(courseId, dto) {
        return this.coursesService.addSyllabus(courseId, dto);
    }
    async updateSyllabus(courseId, syllabusId, dto) {
        return this.coursesService.updateSyllabus(courseId, syllabusId, dto);
    }
    async removeSyllabus(courseId, syllabusId) {
        return this.coursesService.removeSyllabus(courseId, syllabusId);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Barcha kurslar ro'yxati" }),
    ApiResponse({ status: 200, description: "Kurslar ro'yxati" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: "Bitta kurs ma'lumotlari" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Yangi kurs yaratish' }),
    ApiResponse({ status: 201, description: 'Kurs yaratildi' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: 'Kursni yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('ADMIN', 'SUPERADMIN'),
    ApiOperation({ summary: "Kursni o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "remove", null);
__decorate([
    Post(':id/syllabus'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Kursga dars mavzusini (syllabus) qo'shish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateCourseSyllabusDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addSyllabus", null);
__decorate([
    Patch(':id/syllabus/:syllabusId'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: 'Kurs dars mavzusini yangilash' }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('syllabusId', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, UpdateCourseSyllabusDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updateSyllabus", null);
__decorate([
    Delete(':id/syllabus/:syllabusId'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Kurs dars mavzusini o'chirish" }),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('syllabusId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "removeSyllabus", null);
CoursesController = __decorate([
    ApiTags('Courses'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('courses'),
    __metadata("design:paramtypes", [CoursesService])
], CoursesController);
export { CoursesController };
//# sourceMappingURL=courses.controller.js.map