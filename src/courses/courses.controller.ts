import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto.js';
import {
  CreateCourseSyllabusDto,
  UpdateCourseSyllabusDto,
} from './dto/course-syllabus.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: "Barcha kurslar ro'yxati" })
  @ApiResponse({ status: 200, description: "Kurslar ro'yxati" })
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Bitta kurs ma'lumotlari" })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({ status: 201, description: 'Kurs yaratildi' })
  async create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Kursni yangilash' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Kursni o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  // --- SYLLABUS ---
  @Post(':id/syllabus')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Kursga dars mavzusini (syllabus) qo'shish" })
  async addSyllabus(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() dto: CreateCourseSyllabusDto,
  ) {
    return this.coursesService.addSyllabus(courseId, dto);
  }

  @Patch(':id/syllabus/:syllabusId')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Kurs dars mavzusini yangilash' })
  async updateSyllabus(
    @Param('id', ParseIntPipe) courseId: number,
    @Param('syllabusId', ParseIntPipe) syllabusId: number,
    @Body() dto: UpdateCourseSyllabusDto,
  ) {
    return this.coursesService.updateSyllabus(courseId, syllabusId, dto);
  }

  @Delete(':id/syllabus/:syllabusId')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Kurs dars mavzusini o'chirish" })
  async removeSyllabus(
    @Param('id', ParseIntPipe) courseId: number,
    @Param('syllabusId', ParseIntPipe) syllabusId: number,
  ) {
    return this.coursesService.removeSyllabus(courseId, syllabusId);
  }
}
