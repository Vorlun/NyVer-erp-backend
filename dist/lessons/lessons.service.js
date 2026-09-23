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
let LessonsService = class LessonsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query.groupId)
            where.groupId = query.groupId;
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
            if (query.dateFrom)
                where.lessonDate.gte = new Date(query.dateFrom);
            if (query.dateTo)
                where.lessonDate.lte = new Date(query.dateTo);
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
    async findOne(id) {
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
        if (!lesson)
            throw new NotFoundException(`Dars (ID: ${id}) topilmadi`);
        return lesson;
    }
    async create(dto) {
        const group = await this.prisma.group.findUnique({
            where: { id: dto.groupId },
        });
        if (!group)
            throw new NotFoundException('Guruh topilmadi');
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
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.topic !== undefined)
            data.topic = dto.topic;
        if (dto.description !== undefined)
            data.description = dto.description;
        if (dto.videoUrl !== undefined)
            data.videoUrl = dto.videoUrl;
        if (dto.content !== undefined)
            data.content = dto.content;
        if (dto.lessonDate !== undefined)
            data.lessonDate = new Date(dto.lessonDate);
        if (dto.startTime !== undefined)
            data.startTime = dto.startTime;
        if (dto.endTime !== undefined)
            data.endTime = dto.endTime;
        if (dto.status !== undefined)
            data.status = dto.status;
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.lesson.delete({ where: { id } });
        return { message: `Dars (ID: ${id}) o'chirildi` };
    }
    async addMaterial(lessonId, dto) {
        await this.findOne(lessonId);
        return this.prisma.lessonMaterial.create({
            data: {
                lessonId,
                ...dto,
            },
        });
    }
    async updateMaterial(lessonId, materialId, dto) {
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
    async removeMaterial(lessonId, materialId) {
        const material = await this.prisma.lessonMaterial.findUnique({
            where: { id: materialId },
        });
        if (!material || material.lessonId !== lessonId) {
            throw new NotFoundException('Material topilmadi');
        }
        await this.prisma.lessonMaterial.delete({ where: { id: materialId } });
        return { message: "Material o'chirildi" };
    }
};
LessonsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], LessonsService);
export { LessonsService };
//# sourceMappingURL=lessons.service.js.map