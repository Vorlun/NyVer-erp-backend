var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let StudentService = class StudentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(studentId) {
        const user = await this.prisma.user.findUnique({
            where: { id: studentId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                coins: true,
                studentEnrollments: {
                    where: { status: 'ACTIVE' },
                    include: {
                        group: {
                            select: {
                                id: true,
                                name: true,
                                startTime: true,
                                endTime: true,
                                weekDays: true,
                                lessons: {
                                    orderBy: { lessonDate: 'asc' },
                                    select: {
                                        id: true,
                                        lessonDate: true,
                                        startTime: true,
                                        endTime: true,
                                        topic: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new NotFoundException('Foydalanuvchi topilmadi');
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        const upcomingLessons = [];
        for (const gs of user.studentEnrollments) {
            for (const lesson of gs.group.lessons) {
                const d = new Date(lesson.lessonDate);
                if (d >= monthStart && d <= monthEnd) {
                    upcomingLessons.push({
                        date: d.toISOString().slice(0, 10),
                        groupName: gs.group.name,
                        groupId: gs.group.id,
                        lessonId: lesson.id,
                        topic: lesson.topic,
                        startTime: lesson.startTime || gs.group.startTime || '09:00',
                        endTime: lesson.endTime || gs.group.endTime || '12:00',
                    });
                }
            }
        }
        upcomingLessons.sort((a, b) => a.date.localeCompare(b.date));
        const transactions = await this.prisma.coinTransaction.findMany({
            where: { userId: studentId, amount: { gt: 0 } },
            select: { amount: true },
        });
        const totalXP = transactions.reduce((s, t) => s + t.amount, 0);
        const level = Math.floor(totalXP / 300) + 1;
        const xpInLevel = totalXP % 300;
        const xpToNext = 300 - xpInLevel;
        const allStudents = await this.prisma.user.findMany({
            where: { role: 'STUDENT' },
            select: { id: true, coins: true },
            orderBy: { coins: 'desc' },
        });
        const ratingPos = allStudents.findIndex((s) => s.id === studentId) + 1;
        return {
            coins: user.coins || 0,
            xp: totalXP,
            level,
            xpInLevel,
            xpToNext,
            rating: ratingPos || allStudents.length,
            totalStudents: allStudents.length,
            upcomingLessons,
        };
    }
    async getStudentGroups(studentId) {
        const enrollments = await this.prisma.groupStudent.findMany({
            where: { studentId, status: 'ACTIVE' },
            include: {
                group: {
                    include: {
                        course: { select: { id: true, name: true } },
                        teachers: {
                            where: { isMain: true },
                            include: {
                                teacher: { select: { id: true, firstName: true, lastName: true } },
                            },
                            take: 1,
                        },
                        _count: { select: { lessons: true } },
                        lessons: {
                            select: {
                                id: true,
                                lessonDate: true,
                                attendances: {
                                    where: { studentId },
                                    select: { status: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        return enrollments.map((e) => {
            const group = e.group;
            const totalLessons = group._count.lessons;
            const completedLessons = group.lessons.filter((l) => l.attendances.some((a) => a.status === 'PRESENT' || a.status === 'LATE')).length;
            const mainTeacher = group.teachers[0]?.teacher;
            return {
                id: group.id,
                name: group.name,
                status: group.status,
                courseName: group.course?.name || '',
                teacherName: mainTeacher
                    ? `${mainTeacher.firstName} ${mainTeacher.lastName}`
                    : 'Belgilanmagan',
                startTime: group.startTime,
                endTime: group.endTime,
                weekDays: group.weekDays || [],
                totalLessons,
                completedLessons,
                progressPercent: totalLessons > 0
                    ? Math.round((completedLessons / totalLessons) * 100)
                    : 0,
            };
        });
    }
    async getGroupLessons(studentId, groupId) {
        const enrollment = await this.prisma.groupStudent.findUnique({
            where: { studentId_groupId: { studentId, groupId } },
        });
        if (!enrollment || enrollment.status !== 'ACTIVE') {
            throw new ForbiddenException('Bu guruhga kirishga ruxsatiz');
        }
        const lessons = await this.prisma.lesson.findMany({
            where: { groupId },
            orderBy: [{ lessonDate: 'asc' }, { lessonOrder: 'asc' }],
            include: {
                attendances: {
                    where: { studentId },
                    select: { status: true },
                },
                homework: { select: { id: true, title: true } },
            },
        });
        let foundAvailable = false;
        const result = [];
        for (let i = lessons.length - 1; i >= 0; i--) {
            const lesson = lessons[i];
            const attended = lesson.attendances.some((a) => a.status === 'PRESENT' || a.status === 'LATE');
            if (attended) {
                lessons[i]._computed_status = 'COMPLETED';
            }
            else {
                lessons[i]._computed_status = 'LOCKED';
            }
        }
        for (let i = 0; i < lessons.length; i++) {
            if (lessons[i]._computed_status === 'LOCKED' && !foundAvailable) {
                lessons[i]._computed_status = 'AVAILABLE';
                foundAvailable = true;
            }
        }
        return lessons.map((l) => ({
            id: l.id,
            lessonOrder: l.lessonOrder,
            topic: l.topic,
            description: l.description,
            lessonDate: l.lessonDate
                ? new Date(l.lessonDate).toISOString().slice(0, 10)
                : null,
            startTime: l.startTime,
            endTime: l.endTime,
            status: l._computed_status,
            hasHomework: !!l.homework,
            homeworkId: l.homework?.id || null,
        }));
    }
    async getLesson(studentId, lessonId) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                group: {
                    select: {
                        id: true,
                        name: true,
                        startTime: true,
                        endTime: true,
                    },
                },
                materials: true,
                homework: {
                    include: {
                        submissions: {
                            where: { studentId },
                            select: { id: true, status: true, submittedAt: true },
                        },
                    },
                },
                attendances: {
                    where: { studentId },
                    select: { status: true },
                },
            },
        });
        if (!lesson)
            throw new NotFoundException('Dars topilmadi');
        const enrollment = await this.prisma.groupStudent.findUnique({
            where: {
                studentId_groupId: { studentId, groupId: lesson.groupId },
            },
        });
        if (!enrollment || enrollment.status !== 'ACTIVE') {
            throw new ForbiddenException('Bu guruhga kirishga ruxsatiz');
        }
        const attended = lesson.attendances.some((a) => a.status === 'PRESENT' || a.status === 'LATE');
        const allLessons = await this.prisma.lesson.findMany({
            where: { groupId: lesson.groupId },
            orderBy: [{ lessonDate: 'asc' }, { lessonOrder: 'asc' }],
            include: {
                attendances: { where: { studentId }, select: { status: true } },
            },
        });
        let foundAvailable = false;
        let lessonStatus = 'LOCKED';
        for (const l of allLessons) {
            const att = l.attendances.some((a) => a.status === 'PRESENT' || a.status === 'LATE');
            if (att) {
                if (l.id === lessonId)
                    lessonStatus = 'COMPLETED';
            }
            else if (!foundAvailable) {
                foundAvailable = true;
                if (l.id === lessonId)
                    lessonStatus = 'AVAILABLE';
            }
        }
        if (lessonStatus === 'LOCKED') {
            throw new ForbiddenException("Bu dars hali qulflangan. Avvalgi darslarni bajaring.");
        }
        return {
            id: lesson.id,
            lessonOrder: lesson.lessonOrder,
            topic: lesson.topic,
            description: lesson.description,
            content: lesson.content,
            videoUrl: lesson.videoUrl,
            lessonDate: lesson.lessonDate
                ? new Date(lesson.lessonDate).toISOString().slice(0, 10)
                : null,
            startTime: lesson.startTime,
            endTime: lesson.endTime,
            status: lessonStatus,
            groupId: lesson.groupId,
            groupName: lesson.group.name,
            materials: lesson.materials.map((m) => ({
                id: m.id,
                title: m.title,
                fileUrl: m.fileUrl,
                fileType: m.fileType,
            })),
            homework: lesson.homework
                ? {
                    id: lesson.homework.id,
                    title: lesson.homework.title,
                    task: lesson.homework.task,
                    maxScore: lesson.homework.maxScore,
                    deadline: lesson.homework.deadline,
                    mySubmission: lesson.homework.submissions[0] || null,
                }
                : null,
        };
    }
};
StudentService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], StudentService);
export { StudentService };
//# sourceMappingURL=student.service.js.map