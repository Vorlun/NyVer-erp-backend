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
  ForbiddenException,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { PaymentsService } from './payments.service.js';
import {
  CreatePaymentDto,
  UpdatePaymentDto,
  QueryPaymentDto,
  OnlineCheckoutDto,
  PayFromBalanceDto,
  TopUpBalanceDto,
} from './dto/create-payment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number; role: string };
}

const RECEIPT_MULTER = {
  storage: memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Faqat rasm fayllari qabul qilinadi'), false);
    }
  },
};

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  // ── Landing Checkout (ochiq) ──────────────────────────────────────────────

  @Post('online-checkout')
  @Public()
  @ApiOperation({ summary: "Landing sahifasidan onlayn to'lov qilish (JSON + base64)" })
  async onlineCheckout(@Body() dto: OnlineCheckoutDto) {
    return this.paymentsService.processOnlineCheckout(dto);
  }

  /**
   * Multipart/form-data orqali chek rasmini yuklash.
   * Fayl `receipt` field nomi bilan yuboriladi.
   * Alternativa sifatida JSON body da base64 string ham ishlaydi.
   */
  @Post('upload-receipt')
  @Public()
  @ApiOperation({ summary: "To'lov cheki rasmini yuklash (multipart YOKI base64 JSON)" })
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('receipt', RECEIPT_MULTER))
  async uploadReceipt(
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: { image?: string },
  ) {
    // Multipart fayl usuli
    if (file) {
      const url = this.paymentsService.saveReceiptBuffer({
        buffer: file.buffer,
        originalname: file.originalname,
      });
      return { url, success: true };
    }

    // JSON base64 usuli (eski kompatibillik)
    if (body?.image) {
      const url = this.paymentsService.saveBase64Receipt(body.image);
      return { url, success: true };
    }

    throw new BadRequestException("Rasm ma'lumoti kiritilmadi (fayl yoki base64)");
  }

  // ── Admin operatsiyalar ──────────────────────────────────────────────────

  @Post(':id/approve')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "To'lovni tasdiqlash, guruhga biriktirish va emailga login-parol yuborish" })
  async approvePayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.approvePayment(id);
  }

  // ── Balans (Wallet) ──────────────────────────────────────────────────────

  @Post('pay-from-balance')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({
    summary: "Talabaning balansidan kursni sotib olish — darhol enrollment va payment yaratiladi",
  })
  async payFromBalance(@Body() dto: PayFromBalanceDto) {
    return this.paymentsService.payFromBalance(dto);
  }

  // ── CRUD ─────────────────────────────────────────────────────────────────

  @Get()
  @Roles('ADMIN', 'SUPERADMIN', 'STUDENT')
  @ApiOperation({ summary: "To'lovlar tarixi" })
  async findAll(
    @Query() query: QueryPaymentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (req.user.role === 'STUDENT') {
      query.studentId = req.user.id;
    }
    return this.paymentsService.findAll(query);
  }

  @Get('stats')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "To'lovlar statistikasi va taqsimoti" })
  async getStats() {
    return this.paymentsService.getStats();
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPERADMIN', 'STUDENT')
  @ApiOperation({ summary: "Bitta to'lov ma'lumotlari" })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const payment = await this.paymentsService.findOne(id);
    if (req.user.role === 'STUDENT' && payment.studentId !== req.user.id) {
      throw new ForbiddenException(
        "Siz faqat o'zingizning to'lovingizni ko'rishingiz mumkin",
      );
    }
    return payment;
  }

  @Post()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Yangi to'lov kiritish (admin)" })
  async create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "To'lovni yangilash" })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "To'lovni o'chirish" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }
}
