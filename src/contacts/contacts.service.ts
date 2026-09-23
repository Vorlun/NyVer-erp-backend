import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateContactDto,
  UpdateContactStatusDto,
  QueryContactDto,
} from './dto/contact.dto.js';
import type { Prisma } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    const contact = await this.prisma.contactRequest.create({
      data: {
        name: dto.name.trim(),
        phone: dto.phone.trim(),
        email: dto.email?.trim().toLowerCase() || null,
        message: dto.message?.trim() || null,
        status: 'NEW',
      },
    });

    return {
      success: true,
      message: "Murojaatingiz qabul qilindi. Tez orada siz bilan bog'lanamiz!",
      id: contact.id,
    };
  }

  async findAll(query: QueryContactDto) {
    const { status, page = 1, limit = 20, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ContactRequestWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [contacts, total] = await this.prisma.$transaction([
      this.prisma.contactRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.contactRequest.count({ where }),
    ]);

    // Status bo'yicha umumiy hisoblar
    const [newCount, inProgressCount, resolvedCount, rejectedCount] =
      await this.prisma.$transaction([
        this.prisma.contactRequest.count({ where: { status: 'NEW' } }),
        this.prisma.contactRequest.count({ where: { status: 'IN_PROGRESS' } }),
        this.prisma.contactRequest.count({ where: { status: 'RESOLVED' } }),
        this.prisma.contactRequest.count({ where: { status: 'REJECTED' } }),
      ]);

    return {
      data: contacts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        new: newCount,
        inProgress: inProgressCount,
        resolved: resolvedCount,
        rejected: rejectedCount,
      },
    };
  }

  async updateStatus(id: number, dto: UpdateContactStatusDto) {
    const existing = await this.prisma.contactRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Murojaat (ID: ${id}) topilmadi`);
    }

    const updated = await this.prisma.contactRequest.update({
      where: { id },
      data: { status: dto.status },
    });

    return updated;
  }

  async remove(id: number) {
    const existing = await this.prisma.contactRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Murojaat (ID: ${id}) topilmadi`);
    }

    await this.prisma.contactRequest.delete({ where: { id } });

    return { success: true, message: `Murojaat (ID: ${id}) o'chirildi` };
  }
}
