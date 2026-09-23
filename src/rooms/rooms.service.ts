import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto.js';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { groups: true } } },
    });
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: { groups: true },
    });
    if (!room) throw new NotFoundException(`Xona (ID: ${id}) topilmadi`);
    return room;
  }

  async create(dto: CreateRoomDto) {
    const existing = await this.prisma.room.findUnique({
      where: { name: dto.name },
    });
    if (existing)
      throw new ConflictException('Bu nomdagi xona allaqachon mavjud');

    return this.prisma.room.create({ data: dto });
  }

  async update(id: number, dto: UpdateRoomDto) {
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

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.room.delete({ where: { id } });
    return { message: `Xona (ID: ${id}) o'chirildi` };
  }
}
