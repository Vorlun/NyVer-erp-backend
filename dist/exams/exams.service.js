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
let ExamsService = class ExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(groupId) {
        const where = groupId ? { groupId } : {};
        return this.prisma.exam.findMany({
            where,
            orderBy: { examDate: 'desc' },
            include: {
                group: { select: { id: true, name: true } },
                _count: { select: { results: true } },
            },
        });
    }
    async findOne(id) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                group: { select: { id: true, name: true } },
                results: {
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
            },
        });
        if (!exam)
            throw new NotFoundException(`Imtihon (ID: ${id}) topilmadi`);
        return exam;
    }
    async create(dto) {
        const group = await this.prisma.group.findUnique({
            where: { id: dto.groupId },
        });
        if (!group)
            throw new NotFoundException('Guruh topilmadi');
        return this.prisma.exam.create({
            data: {
                title: dto.title,
                examDate: new Date(dto.examDate),
                maxScore: dto.maxScore ?? 100,
                groupId: dto.groupId,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.exam.update({
            where: { id },
            data: {
                title: dto.title,
                examDate: dto.examDate ? new Date(dto.examDate) : undefined,
                maxScore: dto.maxScore,
                groupId: dto.groupId,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.exam.delete({ where: { id } });
        return { message: `Imtihon (ID: ${id}) o'chirildi` };
    }
    async setResults(examId, results) {
        await this.findOne(examId);
        await this.prisma.examResult.deleteMany({
            where: { examId },
        });
        if (results.length > 0) {
            const data = results.map((r) => ({
                examId,
                studentId: r.studentId,
                score: r.score,
            }));
            await this.prisma.examResult.createMany({ data });
        }
        return this.findOne(examId);
    }
};
ExamsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ExamsService);
export { ExamsService };
//# sourceMappingURL=exams.service.js.map