var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let RoomsService = class RoomsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.room.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { groups: true } } },
        });
    }
    async findOne(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: { groups: true },
        });
        if (!room)
            throw new NotFoundException(`Xona (ID: ${id}) topilmadi`);
        return room;
    }
    async create(dto) {
        const existing = await this.prisma.room.findUnique({
            where: { name: dto.name },
        });
        if (existing)
            throw new ConflictException('Bu nomdagi xona allaqachon mavjud');
        return this.prisma.room.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.name) {
            const existing = await this.prisma.room.findFirst({
                where: { name: dto.name, NOT: { id } },
            });
            if (existing)
                throw new ConflictException('Bu nomdagi xona allaqachon mavjud');
        }
        return this.prisma.room.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.room.delete({ where: { id } });
        return { message: `Xona (ID: ${id}) o'chirildi` };
    }
};
RoomsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RoomsService);
export { RoomsService };
//# sourceMappingURL=rooms.service.js.map