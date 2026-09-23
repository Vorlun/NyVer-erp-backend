import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateLessonDto,
  UpdateLessonDto,
  QueryLessonDto,
} from './dto/create-lesson.dto.js';
import {
  CreateLessonMaterialDto,
  UpdateLessonMaterialDto,
} from './dto/lesson-material.dto.js';
import type { Prisma } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryLessonDto) {
    const where: Prisma.LessonWhereInput = {};

    if (query.groupId) where.groupId = query.groupId;
    if (query.teacherId) {
      where.OR = [
        { teacherId: query.teacherId },
        {
          group: {
            teachers: {
              some: {
                teacherId: query.teacherId,
              },
            },
          },
        },
      ];
    }
    if (query.dateFrom || query.dateTo) {
      where.lessonDate = {};
      if (query.dateFrom) where.lessonDate.gte = new Date(query.dateFrom);
      if (query.dateTo) where.lessonDate.lte = new Date(query.dateTo);
    }

    return this.prisma.lesson.findMany({
      where,
      orderBy: [{ lessonDate: 'desc' }, { lessonOrder: 'asc' }],
      include: {
        group: { select: { id: true, name: true } },
        teacher: { select: { id: true, firstName: true, lastName: true } },
        room: { select: { id: true, name: true } },
        homework: { select: { id: true, title: true } },
        _count: { select: { attendances: true } },
      },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        group: { include: { course: true } },
        teacher: {
          select: { id: true, firstName: true, lastName: true, phone: true },
        },
        room: true,
        attendances: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
        },
        homework: { include: { submissions: true } },
        materials: true,
      },
    });

    if (!lesson) throw new NotFoundException(`Dars (ID: ${id}) topilmadi`);
    return lesson;
  }

  async create(dto: CreateLessonDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!group) throw new NotFoundException('Guruh topilmadi');

    return this.prisma.lesson.create({
      data: {
        lessonOrder: dto.lessonOrder,
        topic: dto.topic,
        description: dto.description || null,
        videoUrl: dto.videoUrl || null,
        content: dto.content || null,
        lessonDate: new Date(dto.lessonDate),
        startTime: dto.startTime || group.startTime,
        endTime: dto.endTime || group.endTime,
        groupId: dto.groupId,
        teacherId: dto.teacherId || null,
        roomId: dto.roomId || group.roomId,
      },
      include: {
        group: { select: { id: true, name: true } },
        teacher: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async update(id: number, dto: UpdateLessonDto) {
    await this.findOne(id);

    const data: Prisma.LessonUpdateInput = {};
    if (dto.topic !== undefined) data.topic = dto.topic;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.videoUrl !== undefined) data.videoUrl = dto.videoUrl;
    if (dto.content !== undefined) data.content = dto.content;
    if (dto.lessonDate !== undefined)
      data.lessonDate = new Date(dto.lessonDate);
    if (dto.startTime !== undefined) data.startTime = dto.startTime;
    if (dto.endTime !== undefined) data.endTime = dto.endTime;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.teacherId !== undefined)
      data.teacher = dto.teacherId ? { connect: { id: dto.teacherId } } : { disconnect: true };
    if (dto.roomId !== undefined)
      data.room = dto.roomId ? { connect: { id: dto.roomId } } : { disconnect: true };

    return this.prisma.lesson.update({
      where: { id },
      data,
      include: {
        group: { select: { id: true, name: true } },
        teacher: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.lesson.delete({ where: { id } });
    return { message: `Dars (ID: ${id}) o'chirildi` };
  }

  // --- MATERIAL ---
  async addMaterial(lessonId: number, dto: CreateLessonMaterialDto) {
    await this.findOne(lessonId); // verify lesson exists
    return this.prisma.lessonMaterial.create({
      data: {
        lessonId,
        ...dto,
      },
    });
  }

  async updateMaterial(
    lessonId: number,
    materialId: number,
    dto: UpdateLessonMaterialDto,
  ) {
    const material = await this.prisma.lessonMaterial.findUnique({
      where: { id: materialId },
    });
    if (!material || material.lessonId !== lessonId) {
      throw new NotFoundException('Material topilmadi');
    }

    return this.prisma.lessonMaterial.update({
      where: { id: materialId },
      data: dto,
    });
  }

  async removeMaterial(lessonId: number, materialId: number) {
    const material = await this.prisma.lessonMaterial.findUnique({
      where: { id: materialId },
    });
    if (!material || material.lessonId !== lessonId) {
      throw new NotFoundException('Material topilmadi');
    }

    await this.prisma.lessonMaterial.delete({ where: { id: materialId } });
    return { message: "Material o'chirildi" };
  }
}
