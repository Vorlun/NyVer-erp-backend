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
import { ExamsService } from './exams.service.js';
import {
  CreateExamDto,
  UpdateExamDto,
  ExamResultDto,
} from './dto/create-exam.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: "Imtihonlar ro'yxati (guruh bo'yicha filter)" })
  async findAll(@Query('groupId') groupId?: string) {
    return this.examsService.findAll(groupId ? Number(groupId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta imtihon va natijalari' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Yangi imtihon yaratish' })
  async create(@Body() dto: CreateExamDto) {
    return this.examsService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Imtihonni yangilash' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExamDto,
  ) {
    return this.examsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Imtihonni o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.remove(id);
  }

  @Post(':id/results')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Imtihon natijalarini to'ldirish/yangilash" })
  async setResults(
    @Param('id', ParseIntPipe) id: number,
    @Body() results: ExamResultDto[],
  ) {
    return this.examsService.setResults(id, results);
  }
}
