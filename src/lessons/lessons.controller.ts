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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LessonsService } from './lessons.service.js';
import {
  CreateLessonDto,
  UpdateLessonDto,
  QueryLessonDto,
} from './dto/create-lesson.dto.js';
import {
  CreateLessonMaterialDto,
  UpdateLessonMaterialDto,
} from './dto/lesson-material.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: "Darslar ro'yxati (filtrlash mumkin)" })
  async findAll(@Query() query: QueryLessonDto) {
    return this.lessonsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Bitta dars ma'lumotlari (attendance, homework bilan)",
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Yangi dars yaratish' })
  async create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Darsni yangilash' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Darsni o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }

  // --- MATERIAL ---
  @Post(':id/materials')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Darsga material (fayl) qo'shish" })
  async addMaterial(
    @Param('id', ParseIntPipe) lessonId: number,
    @Body() dto: CreateLessonMaterialDto,
  ) {
    return this.lessonsService.addMaterial(lessonId, dto);
  }

  @Patch(':id/materials/:materialId')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Dars materialini yangilash' })
  async updateMaterial(
    @Param('id', ParseIntPipe) lessonId: number,
    @Param('materialId', ParseIntPipe) materialId: number,
    @Body() dto: UpdateLessonMaterialDto,
  ) {
    return this.lessonsService.updateMaterial(lessonId, materialId, dto);
  }

  @Delete(':id/materials/:materialId')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Dars materialini o'chirish" })
  async removeMaterial(
    @Param('id', ParseIntPipe) lessonId: number,
    @Param('materialId', ParseIntPipe) materialId: number,
  ) {
    return this.lessonsService.removeMaterial(lessonId, materialId);
  }
}
