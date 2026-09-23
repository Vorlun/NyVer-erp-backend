import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service.js';
import {
  AddCoinsDto,
  CreatePrizeDto,
  UpdatePrizeDto,
} from './dto/gamification.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Gamification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private gamificationService: GamificationService) {}

  @Get('balance/:userId')
  @ApiOperation({ summary: 'Foydalanuvchi tanga balansi' })
  async getBalance(@Param('userId', ParseIntPipe) userId: number) {
    return this.gamificationService.getBalance(userId);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Tanga tranzaksiyalari tarixi' })
  async getTransactions(@Query('userId') userId?: string) {
    return this.gamificationService.getTransactions(
      userId ? Number(userId) : undefined,
    );
  }

  @Post('coins/add')
  @Roles('ADMIN', 'SUPERADMIN', 'TEACHER')
  @ApiOperation({ summary: "Foydalanuvchiga tanga qo'shish/ayirish" })
  async addCoins(@Body() dto: AddCoinsDto) {
    return this.gamificationService.addCoins(dto);
  }

  @Get('prizes')
  @ApiOperation({ summary: "Sovrinlar ro'yxati" })
  async findAllPrizes() {
    return this.gamificationService.findAllPrizes();
  }

  @Post('prizes')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Yangi sovrin qo'shish" })
  async createPrize(@Body() dto: CreatePrizeDto) {
    return this.gamificationService.createPrize(dto);
  }

  @Patch('prizes/:id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Sovrinni yangilash' })
  async updatePrize(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePrizeDto,
  ) {
    return this.gamificationService.updatePrize(id, dto);
  }

  @Post('prizes/:id/buy')
  @Roles('STUDENT')
  @ApiOperation({ summary: 'Sovrin sotib olish (Student)' })
  async buyPrize(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.gamificationService.buyPrize(id, req.user.id);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Sovrin buyurtmalari tarixi' })
  async getOrders(@Query('studentId') studentId?: string) {
    return this.gamificationService.getOrders(
      studentId ? Number(studentId) : undefined,
    );
  }

  @Patch('orders/:id/give')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Sovrinni topshirildi deb belgilash' })
  async markAsGiven(@Param('id', ParseIntPipe) id: number) {
    return this.gamificationService.markOrderAsGiven(id);
  }
}
