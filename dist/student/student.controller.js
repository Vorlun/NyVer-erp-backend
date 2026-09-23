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
import { Controller, Get, Param, UseGuards, ParseIntPipe, Req, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let StudentController = class StudentController {
    studentService;
    constructor(studentService) {
        this.studentService = studentService;
    }
    async getDashboard(req) {
        return this.studentService.getDashboard(req.user.id);
    }
    async getGroups(req) {
        return this.studentService.getStudentGroups(req.user.id);
    }
    async getGroupLessons(groupId, req) {
        return this.studentService.getGroupLessons(req.user.id, groupId);
    }
    async getLesson(lessonId, req) {
        return this.studentService.getLesson(req.user.id, lessonId);
    }
};
__decorate([
    Get('dashboard'),
    ApiOperation({ summary: 'Talaba bosh sahifasi — coins, xp, reyting, dars jadvali' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getDashboard", null);
__decorate([
    Get('groups'),
    ApiOperation({ summary: "Talabaning faol guruhlari (progress bilan)" }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getGroups", null);
__decorate([
    Get('groups/:groupId/lessons'),
    ApiOperation({ summary: "Guruh darslari ro'yxati (LOCKED/AVAILABLE/COMPLETED statuslari bilan)" }),
    __param(0, Param('groupId', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getGroupLessons", null);
__decorate([
    Get('lessons/:lessonId'),
    ApiOperation({ summary: "Bitta dars to'liq ma'lumoti (video, materiallar, homework)" }),
    __param(0, Param('lessonId', ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getLesson", null);
StudentController = __decorate([
    ApiTags('Student'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('STUDENT', 'ADMIN', 'SUPERADMIN'),
    Controller('student'),
    __metadata("design:paramtypes", [StudentService])
], StudentController);
export { StudentController };
//# sourceMappingURL=student.controller.js.map