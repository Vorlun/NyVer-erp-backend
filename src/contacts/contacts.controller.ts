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
import { ContactsService } from './contacts.service.js';
import {
  CreateContactDto,
  UpdateContactStatusDto,
  QueryContactDto,
} from './dto/contact.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';

@ApiTags('Contacts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  /**
   * Ochiq endpoint — landing, checkout yoki boshqa sahifalardan murojaat yuborish
   */
  @Post()
  @Public()
  @ApiOperation({ summary: 'Murojaat yuborish (Ommaviy endpoint)' })
  @ApiResponse({ status: 201, description: 'Murojaat qabul qilindi' })
  @ApiResponse({ status: 400, description: "Validatsiya xatoligi — ism va telefon to'ldirilishi shart" })
  async create(@Body() dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }

  /**
   * Faqat Admin — barcha murojaatlar ro'yxati (pagination + qidiruv + status filter)
   */
  @Get()
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Barcha murojaatlar ro'yxati (Admin)" })
  @ApiResponse({ status: 200, description: 'Murojaatlar va statistika' })
  async findAll(@Query() query: QueryContactDto) {
    return this.contactsService.findAll(query);
  }

  /**
   * Faqat Admin — murojaat statusini o'zgartirish
   */
  @Patch(':id/status')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Murojaat statusini o'zgartirish (Admin)" })
  @ApiResponse({ status: 200, description: 'Status yangilandi' })
  @ApiResponse({ status: 404, description: 'Murojaat topilmadi' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactStatusDto,
  ) {
    return this.contactsService.updateStatus(id, dto);
  }

  /**
   * Faqat Admin — murojaatni o'chirish
   */
  @Delete(':id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Murojaatni o'chirish (Admin)" })
  @ApiResponse({ status: 200, description: "Murojaat o'chirildi" })
  @ApiResponse({ status: 404, description: 'Murojaat topilmadi' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.remove(id);
  }
}
