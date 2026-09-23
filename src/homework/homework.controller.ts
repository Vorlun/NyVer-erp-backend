import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HomeworkService } from './homework.service.js';
import {
  CreateHomeworkDto,
  SubmitHomeworkDto,
  CheckSubmissionDto,
} from './dto/create-homework.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Homework')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('homework')
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @Get()
  @ApiOperation({ summary: "Vazifalar ro'yxati" })
  async findAll(
    @Query('lessonId') lessonId?: string,
    @Query('groupId') groupId?: string,
  ) {
    return this.homeworkService.findAll(
      lessonId ? Number(lessonId) : undefined,
      groupId ? Number(groupId) : undefined,
    );
  }

  @Get('submissions')
  @ApiOperation({ summary: "Barcha topshiriqlar ro'yxati (tekshirish uchun)" })
  async findAllSubmissions(@Query('studentId') studentId?: string) {
    return this.homeworkService.findAllSubmissions(
      studentId ? Number(studentId) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta vazifa (submissions bilan)' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.homeworkService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Yangi vazifa yaratish' })
  async create(@Body() dto: CreateHomeworkDto) {
    return this.homeworkService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Vazifani yangilash' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateHomeworkDto>,
  ) {
    return this.homeworkService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Vazifani o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.homeworkService.remove(id);
  }

  @Post(':id/submit')
  @Roles('STUDENT')
  @ApiOperation({ summary: 'Talaba topshirishi (submit)' })
  async submit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubmitHomeworkDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.homeworkService.submit(id, req.user.id, dto);
  }

  @Patch('submissions/:id/check')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Topshiriqni tekshirish va baholash' })
  async checkSubmission(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CheckSubmissionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.homeworkService.checkSubmission(id, req.user.id, dto);
  }
}
