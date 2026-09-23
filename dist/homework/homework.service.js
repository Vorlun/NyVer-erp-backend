var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let HomeworkService = class HomeworkService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(lessonId, groupId) {
        const where = {};
        if (lessonId)
            where.lessonId = lessonId;
        if (groupId)
            where.lesson = { groupId };
        return this.prisma.homework.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: {
                lesson: {
                    select: {
                        id: true,
                        lessonOrder: true,
                        topic: true,
                        groupId: true,
                        group: { select: { id: true, name: true } },
                    },
                },
                _count: { select: { submissions: true } },
            },
        });
    }
    async findAllSubmissions(studentId) {
        const where = {};
        if (studentId)
            where.studentId = studentId;
        return this.prisma.homeworkSubmission.findMany({
            where,
            orderBy: { submittedAt: 'desc' },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
                homework: {
                    select: { id: true, title: true, maxScore: true, maxCoins: true },
                },
                checkedBy: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async findOne(id) {
        const homework = await this.prisma.homework.findUnique({
            where: { id },
            include: {
                lesson: { include: { group: { include: { course: true } } } },
                submissions: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                                photo: true,
                            },
                        },
                        checkedBy: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                    orderBy: { submittedAt: 'desc' },
                },
            },
        });
        if (!homework)
            throw new NotFoundException(`Vazifa (ID: ${id}) topilmadi`);
        return homework;
    }
    async create(dto) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: dto.lessonId },
        });
        if (!lesson)
            throw new NotFoundException('Dars topilmadi');
        const existing = await this.prisma.homework.findUnique({
            where: { lessonId: dto.lessonId },
        });
        if (existing)
            throw new BadRequestException('Bu dars uchun vazifa allaqachon yaratilgan');
        return this.prisma.homework.create({
            data: {
                title: dto.title,
                task: dto.task,
                fileUrls: dto.fileUrls || [],
                maxScore: dto.maxScore ?? 100,
                maxCoins: dto.maxCoins ?? 10,
                deadline: dto.deadline ? new Date(dto.deadline) : null,
                lessonId: dto.lessonId,
            },
            include: { lesson: { select: { id: true, topic: true } } },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.title !== undefined)
            data.title = dto.title;
        if (dto.task !== undefined)
            data.task = dto.task;
        if (dto.fileUrls !== undefined)
            data.fileUrls = dto.fileUrls;
        if (dto.maxScore !== undefined)
            data.maxScore = dto.maxScore;
        if (dto.maxCoins !== undefined)
            data.maxCoins = dto.maxCoins;
        if (dto.deadline !== undefined)
            data.deadline = dto.deadline ? new Date(dto.deadline) : null;
        return this.prisma.homework.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.homework.delete({ where: { id } });
        return { message: `Vazifa (ID: ${id}) o'chirildi` };
    }
    async submit(homeworkId, studentId, dto) {
        const homework = await this.prisma.homework.findUnique({
            where: { id: homeworkId },
        });
        if (!homework)
            throw new NotFoundException('Vazifa topilmadi');
        if (!dto.textAnswer && (!dto.fileUrls || dto.fileUrls.length === 0)) {
            throw new BadRequestException('Javob matni yoki fayl yuklash kerak');
        }
        return this.prisma.homeworkSubmission.upsert({
            where: {
                homeworkId_studentId: { homeworkId, studentId },
            },
            update: {
                textAnswer: dto.textAnswer || null,
                fileUrls: dto.fileUrls || [],
                status: 'PENDING',
                score: null,
                feedback: null,
                coinsEarned: 0,
                checkedById: null,
                checkedAt: null,
            },
            create: {
                homeworkId,
                studentId,
                textAnswer: dto.textAnswer || null,
                fileUrls: dto.fileUrls || [],
                status: 'PENDING',
            },
            include: {
                student: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async checkSubmission(submissionId, checkedById, dto) {
        const submission = await this.prisma.homeworkSubmission.findUnique({
            where: { id: submissionId },
            include: { homework: true },
        });
        if (!submission)
            throw new NotFoundException('Topshiriq topilmadi');
        const coinsEarned = dto.coinsEarned ??
            (dto.score >= 80
                ? submission.homework.maxCoins
                : dto.score >= 60
                    ? Math.floor(submission.homework.maxCoins / 2)
                    : 0);
        const result = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.homeworkSubmission.update({
                where: { id: submissionId },
                data: {
                    score: dto.score,
                    coinsEarned,
                    feedback: dto.feedback || null,
                    status: dto.score >= 60 ? 'ACCEPTED' : 'REJECTED',
                    checkedById,
                    checkedAt: new Date(),
                },
                include: {
                    student: { select: { id: true, firstName: true, lastName: true } },
                },
            });
            if (coinsEarned > 0) {
                await tx.user.update({
                    where: { id: submission.studentId },
                    data: { coins: { increment: coinsEarned } },
                });
                await tx.coinTransaction.create({
                    data: {
                        amount: coinsEarned,
                        reason: 'HOMEWORK_EXCELLENT',
                        description: `Uy vazifasi tekshiruvi: ${dto.score} ball`,
                        userId: submission.studentId,
                    },
                });
            }
            return updated;
        });
        return result;
    }
};
HomeworkService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], HomeworkService);
export { HomeworkService };
//# sourceMappingURL=homework.service.js.map