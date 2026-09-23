import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service.js';
import {
  BulkAttendanceDto,
  QueryAttendanceDto,
} from './dto/mark-attendance.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get()
  @ApiOperation({
    summary: "Davomat ro'yxati (filter: lessonId, studentId, groupId)",
  })
  async findAll(@Query() query: QueryAttendanceDto) {
    return this.attendanceService.findAll(query);
  }

  @Post('bulk')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({
    summary: "Bir dars uchun ko'plab talabalar davomatini belgilash",
  })
  async bulkMark(
    @Body() dto: BulkAttendanceDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.attendanceService.bulkMark(dto, req.user.id);
  }

  @Get('report/:groupId')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Guruh bo'yicha davomat hisoboti" })
  async getGroupReport(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.attendanceService.getGroupReport(groupId);
  }
}
