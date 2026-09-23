var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ContactsService = class ContactsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findAll(query) {
        const { status, page = 1, limit = 20, search } = query;
        const skip = (page - 1) * limit;
        const where = {};
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
        const [newCount, inProgressCount, resolvedCount, rejectedCount] = await this.prisma.$transaction([
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
    async updateStatus(id, dto) {
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
    async remove(id) {
        const existing = await this.prisma.contactRequest.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new NotFoundException(`Murojaat (ID: ${id}) topilmadi`);
        }
        await this.prisma.contactRequest.delete({ where: { id } });
        return { success: true, message: `Murojaat (ID: ${id}) o'chirildi` };
    }
};
ContactsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ContactsService);
export { ContactsService };
//# sourceMappingURL=contacts.service.js.map