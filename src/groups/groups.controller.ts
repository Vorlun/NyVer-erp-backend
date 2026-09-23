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
import { GroupsService } from './groups.service.js';
import {
  CreateGroupDto,
  UpdateGroupDto,
  QueryGroupDto,
  AddStudentDto,
  AddTeacherDto,
} from './dto/create-group.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: "Barcha guruhlar ro'yxati" })
  async findAll(@Query() query: QueryGroupDto) {
    return this.groupsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Bitta guruh ma'lumotlari (talabalar, o'qituvchilar bilan)",
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Yangi guruh yaratish' })
  async create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Guruhni yangilash' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Guruhni o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }

  @Post(':id/students')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Guruhga talaba qo'shish" })
  async addStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddStudentDto,
  ) {
    return this.groupsService.addStudent(id, dto);
  }

  @Delete(':id/students/:studentId')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Guruhdan talabani chiqarish' })
  async removeStudent(
    @Param('id', ParseIntPipe) id: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.groupsService.removeStudent(id, studentId);
  }

  @Post(':id/teachers')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Guruhga o'qituvchi biriktirish" })
  async addTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddTeacherDto,
  ) {
    return this.groupsService.addTeacher(id, dto);
  }

  @Delete(':id/teachers/:teacherId')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Guruhdan o'qituvchini olib tashlash" })
  async removeTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Param('teacherId', ParseIntPipe) teacherId: number,
  ) {
    return this.groupsService.removeTeacher(id, teacherId);
  }
}
