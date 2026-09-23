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
import { Controller, Get, Post, Body, Query, Param, UseGuards, ParseIntPipe, Req, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service.js';
import { BulkAttendanceDto, QueryAttendanceDto, } from './dto/mark-attendance.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async findAll(query) {
        return this.attendanceService.findAll(query);
    }
    async bulkMark(dto, req) {
        return this.attendanceService.bulkMark(dto, req.user.id);
    }
    async getGroupReport(groupId) {
        return this.attendanceService.getGroupReport(groupId);
    }
};
__decorate([
    Get(),
    ApiOperation({
        summary: "Davomat ro'yxati (filter: lessonId, studentId, groupId)",
    }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    Post('bulk'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({
        summary: "Bir dars uchun ko'plab talabalar davomatini belgilash",
    }),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BulkAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "bulkMark", null);
__decorate([
    Get('report/:groupId'),
    Roles('ADMIN', 'SUPERADMIN', 'TEACHER'),
    ApiOperation({ summary: "Guruh bo'yicha davomat hisoboti" }),
    __param(0, Param('groupId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getGroupReport", null);
AttendanceController = __decorate([
    ApiTags('Attendance'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('attendance'),
    __metadata("design:paramtypes", [AttendanceService])
], AttendanceController);
export { AttendanceController };
//# sourceMappingURL=attendance.controller.js.map