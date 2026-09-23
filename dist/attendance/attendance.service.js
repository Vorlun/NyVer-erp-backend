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
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query.lessonId)
            where.lessonId = query.lessonId;
        if (query.studentId)
            where.studentId = query.studentId;
        if (query.groupId)
            where.lesson = { groupId: query.groupId };
        return this.prisma.attendance.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
                lesson: {
                    select: {
                        id: true,
                        lessonOrder: true,
                        topic: true,
                        lessonDate: true,
                        groupId: true,
                    },
                },
                markedBy: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async bulkMark(dto, markedById) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: dto.lessonId },
        });
        if (!lesson)
            throw new NotFoundException('Dars topilmadi');
        const results = await this.prisma.$transaction(async (tx) => {
            const attendances = [];
            for (const record of dto.records) {
                const coinsEarned = record.coinsEarned ??
                    (record.status === 'PRESENT' ? 2 : record.status === 'LATE' ? 1 : 0);
                const attendance = await tx.attendance.upsert({
                    where: {
                        studentId_lessonId: {
                            studentId: record.studentId,
                            lessonId: dto.lessonId,
                        },
                    },
                    update: {
                        status: record.status,
                        coinsEarned,
                        note: record.note || null,
                        markedById,
                    },
                    create: {
                        studentId: record.studentId,
                        lessonId: dto.lessonId,
                        status: record.status,
                        coinsEarned,
                        note: record.note || null,
                        markedById,
                    },
                    include: {
                        student: { select: { id: true, firstName: true, lastName: true } },
                    },
                });
                if (coinsEarned > 0) {
                    await tx.user.update({
                        where: { id: record.studentId },
                        data: { coins: { increment: coinsEarned } },
                    });
                    await tx.coinTransaction.create({
                        data: {
                            amount: coinsEarned,
                            reason: 'ATTENDANCE',
                            description: `Dars #${lesson.lessonOrder} davomati uchun (${record.status})`,
                            userId: record.studentId,
                        },
                    });
                }
                attendances.push(attendance);
            }
            return attendances;
        });
        return results;
    }
    async getGroupReport(groupId) {
        const group = await this.prisma.group.findUnique({
            where: { id: groupId },
            include: {
                students: {
                    where: { status: 'ACTIVE' },
                    include: {
                        student: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
                lessons: {
                    orderBy: { lessonOrder: 'asc' },
                    select: {
                        id: true,
                        lessonOrder: true,
                        topic: true,
                        lessonDate: true,
                    },
                },
            },
        });
        if (!group)
            throw new NotFoundException('Guruh topilmadi');
        const attendances = await this.prisma.attendance.findMany({
            where: { lesson: { groupId } },
        });
        const report = group.students.map((enrollment) => {
            const studentAttendances = attendances.filter((a) => a.studentId === enrollment.studentId);
            const totalLessons = group.lessons.length;
            const present = studentAttendances.filter((a) => a.status === 'PRESENT').length;
            const late = studentAttendances.filter((a) => a.status === 'LATE').length;
            const absent = studentAttendances.filter((a) => a.status === 'ABSENT').length;
            const excused = studentAttendances.filter((a) => a.status === 'EXCUSED').length;
            const percentage = totalLessons > 0
                ? Math.round(((present + late) / totalLessons) * 100)
                : 0;
            return {
                student: enrollment.student,
                totalLessons,
                present,
                late,
                absent,
                excused,
                percentage,
            };
        });
        return {
            group: { id: group.id, name: group.name },
            lessons: group.lessons,
            report,
        };
    }
};
AttendanceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AttendanceService);
export { AttendanceService };
//# sourceMappingURL=attendance.service.js.map