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
import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, ParseIntPipe, Req, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeacherService } from './teacher.service.js';
import { CreateLessonTeacherDto, GradeSubmissionDto, CreateTeacherHomeworkDto, } from './dto/teacher.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let TeacherController = class TeacherController {
    teacherService;
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    async getDashboard(req) {
        return this.teacherService.getTeacherDashboard(req.user.id, req.user.role);
    }
    async getGroups(req) {
        return this.teacherService.getTeacherGroups(req.user.id, req.user.role);
    }
    async getGroupDetail(groupId, req) {
        return this.teacherService.getTeacherGroup(groupId, req.user.id, req.user.role);
    }
    async createLesson(groupId, dto, req) {
        return this.teacherService.createLesson(groupId, req.user.id, req.user.role, dto);
    }
    async createHomework(groupId, dto, req) {
        return this.teacherService.createHomework(groupId, req.user.id, req.user.role, dto);
    }
    async getLessonSubmissions(lessonId, req) {
        return this.teacherService.getLessonSubmissions(lessonId, req.user.id, req.user.role);
    }
    async getAllSubmissions(status, req) {
        return this.teacherService.getAllSubmissions(req.user.id, req.user.role, status);
    }
    async gradeSubmission(submissionId, dto, req) {
        return this.teacherService.gradeSubmission(submissionId, req.user.id, dto);
    }
};
__decorate([
    Get('dashboard'),
    ApiOperation({ summary: 'Mentor dashboard statistikasi' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getDashboard", null);
__decorate([
    Get('groups'),
    ApiOperation({ summary: 'O\'ziga biriktirilgan guruhlar ro\'yxati' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getGroups", null);
__decorate([
    Get('groups/:groupId'),
    ApiOperation({ summary: 'Bitta guruh ma\'lumotlari va darslari' }),
    __param(0, Param('groupId', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getGroupDetail", null);
__decorate([
    Post('groups/:groupId/lessons'),
    ApiOperation({ summary: 'Yangi dars qo\'shish (Mavzu, video link, vazifa sharti)' }),
    __param(0, Param('groupId', ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateLessonTeacherDto, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "createLesson", null);
__decorate([
    Post('groups/:groupId/homework'),
    ApiOperation({ summary: 'Guruh uchun yangi uyga vazifa qo\'shish' }),
    __param(0, Param('groupId', ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateTeacherHomeworkDto, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "createHomework", null);
__decorate([
    Get('lessons/:lessonId/submissions'),
    ApiOperation({ summary: 'Talabalar yuborgan vazifalarni ko\'rish' }),
    __param(0, Param('lessonId', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getLessonSubmissions", null);
__decorate([
    Get('submissions'),
    ApiOperation({ summary: 'Kanban doskasi uchun barcha vazifalar' }),
    __param(0, Query('status')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getAllSubmissions", null);
__decorate([
    Patch('submissions/:submissionId/grade'),
    ApiOperation({ summary: 'Vazifani tekshirish, ball qo\'yish va feedback qoldirish' }),
    __param(0, Param('submissionId', ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, GradeSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "gradeSubmission", null);
TeacherController = __decorate([
    ApiTags('Teacher'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('TEACHER', 'ADMIN', 'SUPERADMIN'),
    Controller('teacher'),
    __metadata("design:paramtypes", [TeacherService])
], TeacherController);
export { TeacherController };
//# sourceMappingURL=teacher.controller.js.map