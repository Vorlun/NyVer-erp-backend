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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUserDto } from './dto/query-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ChangeStatusDto } from './dto/change-status.dto.js';
import { TopUpBalanceDto } from '../payments/dto/create-payment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxati" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar ro'yxati (pagination bilan)",
  })
  async findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Bitta foydalanuvchi ma'lumotlari" })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (faqat Admin)' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
  @ApiResponse({ status: 409, description: 'Telefon/email allaqachon mavjud' })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Foydalanuvchi statusini o'zgartirish" })
  @ApiResponse({ status: 200, description: "Status o'zgartirildi" })
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.usersService.changeStatus(id, dto);
  }

  @Patch(':id/password')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Foydalanuvchi parolini o'zgartirish" })
  @ApiResponse({ status: 200, description: "Parol o'zgartirildi" })
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, dto);
  }

  @Post(':id/balance/top-up')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Foydalanuvchi balansiga pul qo'shish (Admin)" })
  @ApiResponse({ status: 200, description: 'Balans yangilandi' })
  async topUpBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TopUpBalanceDto,
  ) {
    return this.usersService.topUpBalance(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o'chirildi" })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
