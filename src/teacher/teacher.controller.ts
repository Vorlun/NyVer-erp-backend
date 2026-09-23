import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeacherService } from './teacher.service.js';
import {
  CreateLessonTeacherDto,
  GradeSubmissionDto,
  CreateTeacherHomeworkDto,
} from './dto/teacher.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TEACHER', 'ADMIN', 'SUPERADMIN')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Mentor dashboard statistikasi' })
  async getDashboard(@Req() req: AuthenticatedRequest) {
    return this.teacherService.getTeacherDashboard(req.user.id, req.user.role);
  }

  @Get('groups')
  @ApiOperation({ summary: 'O\'ziga biriktirilgan guruhlar ro\'yxati' })
  async getGroups(@Req() req: AuthenticatedRequest) {
    return this.teacherService.getTeacherGroups(req.user.id, req.user.role);
  }

  @Get('groups/:groupId')
  @ApiOperation({ summary: 'Bitta guruh ma\'lumotlari va darslari' })
  async getGroupDetail(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherService.getTeacherGroup(groupId, req.user.id, req.user.role);
  }

  @Post('groups/:groupId/lessons')
  @ApiOperation({ summary: 'Yangi dars qo\'shish (Mavzu, video link, vazifa sharti)' })
  async createLesson(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateLessonTeacherDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherService.createLesson(groupId, req.user.id, req.user.role, dto);
  }

  @Post('groups/:groupId/homework')
  @ApiOperation({ summary: 'Guruh uchun yangi uyga vazifa qo\'shish' })
  async createHomework(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateTeacherHomeworkDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherService.createHomework(groupId, req.user.id, req.user.role, dto);
  }

  @Get('lessons/:lessonId/submissions')
  @ApiOperation({ summary: 'Talabalar yuborgan vazifalarni ko\'rish' })
  async getLessonSubmissions(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherService.getLessonSubmissions(lessonId, req.user.id, req.user.role);
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Kanban doskasi uchun barcha vazifalar' })
  async getAllSubmissions(
    @Query('status') status?: string,
    @Req() req?: AuthenticatedRequest,
  ) {
    return this.teacherService.getAllSubmissions(req!.user.id, req!.user.role, status);
  }

  @Patch('submissions/:submissionId/grade')
  @ApiOperation({ summary: 'Vazifani tekshirish, ball qo\'yish va feedback qoldirish' })
  async gradeSubmission(
    @Param('submissionId', ParseIntPipe) submissionId: number,
    @Body() dto: GradeSubmissionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherService.gradeSubmission(submissionId, req.user.id, dto);
  }
}
