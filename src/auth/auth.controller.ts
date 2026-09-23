import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { SetPasswordDto } from './dto/set-password.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Tizimga kirish (Login)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirish' })
  @ApiResponse({ status: 401, description: "Login yoki parol noto'g'ri" })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Access tokenni yangilash (Refresh)' })
  @ApiResponse({ status: 200, description: 'Yangi tokenlar qaytarildi' })
  @ApiResponse({ status: 401, description: 'Refresh token yaroqsiz' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('set-password')
  @ApiOperation({ summary: 'Taklif linki orqali parolni o\'rnatish' })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli o\'rnatildi' })
  @ApiResponse({ status: 400, description: 'Token yaroqsiz yoki muddati o\'tgan' })
  async setPassword(@Body() dto: SetPasswordDto) {
    return this.authService.setPassword(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Joriy foydalanuvchi profili (Me)' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi profili' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya kerak' })
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.id);
  }
}
