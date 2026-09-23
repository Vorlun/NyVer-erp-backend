import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Student')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('STUDENT', 'ADMIN', 'SUPERADMIN')
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Talaba bosh sahifasi — coins, xp, reyting, dars jadvali' })
  async getDashboard(@Req() req: AuthenticatedRequest) {
    return this.studentService.getDashboard(req.user.id);
  }

  @Get('groups')
  @ApiOperation({ summary: "Talabaning faol guruhlari (progress bilan)" })
  async getGroups(@Req() req: AuthenticatedRequest) {
    return this.studentService.getStudentGroups(req.user.id);
  }

  @Get('groups/:groupId/lessons')
  @ApiOperation({ summary: "Guruh darslari ro'yxati (LOCKED/AVAILABLE/COMPLETED statuslari bilan)" })
  async getGroupLessons(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.studentService.getGroupLessons(req.user.id, groupId);
  }

  @Get('lessons/:lessonId')
  @ApiOperation({ summary: "Bitta dars to'liq ma'lumoti (video, materiallar, homework)" })
  async getLesson(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.studentService.getLesson(req.user.id, lessonId);
  }
}
