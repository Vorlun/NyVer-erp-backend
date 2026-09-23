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
let TeacherService = class TeacherService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTeacherGroups(teacherId, role) {
        const isStaff = role === 'ADMIN' || role === 'SUPERADMIN';
        const whereClause = {
            status: { in: ['ACTIVE', 'PLANNED'] },
        };
        if (!isStaff) {
            whereClause.teachers = {
                some: {
                    teacherId,
                    status: 'ACTIVE',
                },
            };
        }
        const groups = await this.prisma.group.findMany({
            where: whereClause,
            include: {
                course: { select: { id: true, name: true, price: true, durationMonths: true } },
                room: { select: { id: true, name: true, capacity: true } },
                students: {
                    where: { status: 'ACTIVE' },
                    include: {
                        student: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                                photo: true,
                                coins: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                        students: { where: { status: 'ACTIVE' } },
                    },
                },
                lessons: {
                    orderBy: { lessonOrder: 'desc' },
                    take: 5,
                    select: {
                        id: true,
                        topic: true,
                        lessonOrder: true,
                        lessonDate: true,
                        videoUrl: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
        return groups.map((g) => {
            const coursePrice = Number(g.course?.price || 0);
            const studentsCount = g._count.students;
            const groupMonthlyRevenue = studentsCount * coursePrice;
            const teacherEarnings = Math.round(groupMonthlyRevenue * 0.45);
            return {
                id: g.id,
                name: g.name,
                courseId: g.courseId,
                courseName: g.course?.name || 'Umumiy kurs',
                coursePrice,
                groupMonthlyRevenue,
                teacherEarnings,
                roomId: g.roomId,
                roomName: g.room?.name || 'Xona',
                startTime: g.startTime,
                endTime: g.endTime,
                weekDays: g.weekDays,
                status: g.status,
                maxStudents: g.maxStudents,
                studentsCount,
                lessonsCount: g._count.lessons,
                students: g.students.map((s) => s.student),
                recentLessons: g.lessons.map((l) => ({
                    id: l.id,
                    topic: l.topic,
                    lessonOrder: l.lessonOrder,
                    lessonDate: l.lessonDate ? l.lessonDate.toISOString().slice(0, 10) : null,
                    videoUrl: l.videoUrl,
                })),
            };
        });
    }
    async getTeacherGroup(groupId, teacherId, role) {
        await this.verifyTeacherGroupAccess(groupId, teacherId, role);
        const group = await this.prisma.group.findUnique({
            where: { id: groupId },
            include: {
                course: true,
                room: true,
                students: {
                    where: { status: 'ACTIVE' },
                    include: {
                        student: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                                photo: true,
                                coins: true,
                            },
                        },
                    },
                },
                lessons: {
                    orderBy: { lessonOrder: 'asc' },
                    include: {
                        homework: {
                            include: {
                                _count: { select: { submissions: true } },
                            },
                        },
                        submissions: {
                            select: {
                                id: true,
                                status: true,
                                score: true,
                            },
                        },
                    },
                },
            },
        });
        if (!group) {
            throw new NotFoundException(`Guruh (ID: ${groupId}) topilmadi`);
        }
        const coursePrice = Number(group.course?.price || 0);
        const studentsCount = group.students.length;
        const groupMonthlyRevenue = studentsCount * coursePrice;
        const teacherEarnings = Math.round(groupMonthlyRevenue * 0.45);
        return {
            ...group,
            coursePrice,
            studentsCount,
            groupMonthlyRevenue,
            teacherEarnings,
            students: group.students.map((s) => s.student),
            lessons: group.lessons.map((l) => ({
                id: l.id,
                lessonOrder: l.lessonOrder,
                topic: l.topic,
                description: l.description,
                content: l.content,
                videoUrl: l.videoUrl,
                attachedFiles: l.attachedFiles,
                lessonDate: l.lessonDate ? l.lessonDate.toISOString().slice(0, 10) : null,
                startTime: l.startTime,
                endTime: l.endTime,
                homework: l.homework
                    ? {
                        id: l.homework.id,
                        title: l.homework.title,
                        task: l.homework.task,
                        maxScore: l.homework.maxScore,
                        submissionsCount: l.homework._count.submissions,
                    }
                    : null,
            })),
        };
    }
    async createLesson(groupId, teacherId, role, dto) {
        await this.verifyTeacherGroupAccess(groupId, teacherId, role);
        const lessonCount = await this.prisma.lesson.count({ where: { groupId } });
        const lessonOrder = dto.lessonOrder || lessonCount + 1;
        const lessonDate = dto.lessonDate ? new Date(dto.lessonDate) : new Date();
        const lesson = await this.prisma.lesson.create({
            data: {
                groupId,
                teacherId,
                topic: dto.topic,
                content: dto.content || null,
                videoUrl: dto.videoUrl || null,
                attachedFiles: dto.attachedFiles || [],
                lessonOrder,
                lessonDate,
                startTime: dto.startTime || '14:00',
                endTime: dto.endTime || '16:00',
            },
        });
        let homework = null;
        if (dto.homeworkTask && dto.homeworkTask.trim()) {
            homework = await this.prisma.homework.create({
                data: {
                    lessonId: lesson.id,
                    title: `${lesson.topic} — Uyga vazifa`,
                    task: dto.homeworkTask.trim(),
                    fileUrls: dto.attachedFiles || [],
                    maxScore: 100,
                    maxCoins: 10,
                },
            });
        }
        return {
            message: 'Dars muvaffaqiyatli qo\'shildi',
            lesson: {
                ...lesson,
                lessonDate: lesson.lessonDate.toISOString().slice(0, 10),
                homework,
            },
        };
    }
    async createHomework(groupId, teacherId, role, dto) {
        await this.verifyTeacherGroupAccess(groupId, teacherId, role);
        let targetLessonId = dto.lessonId;
        if (targetLessonId) {
            const lesson = await this.prisma.lesson.findFirst({
                where: { id: targetLessonId, groupId },
            });
            if (!lesson) {
                throw new NotFoundException(`Dars (ID: ${targetLessonId}) ushbu guruhda topilmadi`);
            }
        }
        else {
            const latestLesson = await this.prisma.lesson.findFirst({
                where: { groupId },
                orderBy: { lessonOrder: 'desc' },
            });
            if (latestLesson) {
                const existingHw = await this.prisma.homework.findUnique({
                    where: { lessonId: latestLesson.id },
                });
                if (!existingHw) {
                    targetLessonId = latestLesson.id;
                }
            }
            if (!targetLessonId) {
                const lessonCount = await this.prisma.lesson.count({ where: { groupId } });
                const newLesson = await this.prisma.lesson.create({
                    data: {
                        groupId,
                        teacherId,
                        topic: dto.title,
                        lessonOrder: lessonCount + 1,
                        lessonDate: new Date(),
                    },
                });
                targetLessonId = newLesson.id;
            }
        }
        const homework = await this.prisma.homework.upsert({
            where: { lessonId: targetLessonId },
            create: {
                lessonId: targetLessonId,
                title: dto.title,
                task: dto.task,
                maxScore: dto.maxScore ?? 100,
                maxCoins: dto.maxCoins ?? 10,
                deadline: dto.deadline ? new Date(dto.deadline) : null,
                fileUrls: dto.fileUrls || [],
            },
            update: {
                title: dto.title,
                task: dto.task,
                maxScore: dto.maxScore ?? 100,
                maxCoins: dto.maxCoins ?? 10,
                deadline: dto.deadline ? new Date(dto.deadline) : null,
                fileUrls: dto.fileUrls || [],
            },
            include: {
                lesson: {
                    select: { id: true, topic: true, lessonOrder: true },
                },
            },
        });
        return {
            message: 'Uy vazifasi muvaffaqiyatli saqlandi',
            homework,
        };
    }
    async getLessonSubmissions(lessonId, teacherId, role) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                group: { select: { id: true, name: true } },
                homework: true,
            },
        });
        if (!lesson) {
            throw new NotFoundException(`Dars (ID: ${lessonId}) topilmadi`);
        }
        await this.verifyTeacherGroupAccess(lesson.groupId, teacherId, role);
        const submissions = await this.prisma.homeworkSubmission.findMany({
            where: {
                OR: [
                    { lessonId: lesson.id },
                    ...(lesson.homework ? [{ homeworkId: lesson.homework.id }] : []),
                ],
            },
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        photo: true,
                        coins: true,
                    },
                },
                checkedBy: {
                    select: { id: true, firstName: true, lastName: true },
                },
                homework: {
                    select: { id: true, title: true, maxScore: true, maxCoins: true },
                },
            },
            orderBy: { submittedAt: 'desc' },
        });
        return submissions.map((s) => ({
            id: s.id,
            homeworkId: s.homeworkId,
            lessonId: lesson.id,
            lessonTopic: lesson.topic,
            groupName: lesson.group.name,
            student: s.student,
            textAnswer: s.textAnswer,
            fileUrls: s.fileUrls,
            fileUrl: s.fileUrl || (s.fileUrls.length > 0 ? s.fileUrls[0] : null),
            status: s.status,
            score: s.score,
            coinsEarned: s.coinsEarned,
            feedback: s.feedback,
            submittedAt: s.submittedAt,
            checkedAt: s.checkedAt,
            checkedBy: s.checkedBy,
        }));
    }
    async gradeSubmission(submissionId, teacherId, dto) {
        const submission = await this.prisma.homeworkSubmission.findUnique({
            where: { id: submissionId },
            include: {
                homework: true,
                lesson: { select: { id: true, groupId: true, topic: true } },
                student: { select: { id: true, firstName: true, lastName: true, coins: true } },
            },
        });
        if (!submission) {
            throw new NotFoundException(`Topshiriq (ID: ${submissionId}) topilmadi`);
        }
        const coinsEarned = dto.coinsEarned !== undefined
            ? dto.coinsEarned
            : dto.score >= 80
                ? (submission.homework?.maxCoins || 10)
                : dto.score >= 60
                    ? Math.floor((submission.homework?.maxCoins || 10) / 2)
                    : 0;
        const newStatus = dto.status || (dto.score >= 60 ? 'CHECKED' : 'REJECTED');
        const result = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.homeworkSubmission.update({
                where: { id: submissionId },
                data: {
                    score: dto.score,
                    coinsEarned,
                    feedback: dto.feedback || null,
                    status: newStatus,
                    checkedById: teacherId,
                    checkedAt: new Date(),
                },
                include: {
                    student: {
                        select: { id: true, firstName: true, lastName: true, coins: true },
                    },
                    checkedBy: {
                        select: { id: true, firstName: true, lastName: true },
                    },
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
                        description: `Uy vazifasi tekshirildi (${submission.lesson?.topic || 'Dars'}): ${dto.score} ball`,
                        userId: submission.studentId,
                    },
                });
            }
            return updated;
        });
        return {
            message: 'Vazifa muvaffaqiyatli baholandi',
            submission: result,
        };
    }
    async getAllSubmissions(teacherId, role, status) {
        const isStaff = role === 'ADMIN' || role === 'SUPERADMIN';
        let groupIds = [];
        if (!isStaff) {
            const teacherGroups = await this.prisma.groupTeacher.findMany({
                where: { teacherId, status: 'ACTIVE' },
                select: { groupId: true },
            });
            groupIds = teacherGroups.map((tg) => tg.groupId);
        }
        const whereClause = {};
        if (!isStaff) {
            whereClause.OR = [
                { lesson: { groupId: { in: groupIds } } },
                { homework: { lesson: { groupId: { in: groupIds } } } },
            ];
        }
        if (status) {
            whereClause.status = status;
        }
        const submissions = await this.prisma.homeworkSubmission.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        photo: true,
                        coins: true,
                    },
                },
                checkedBy: {
                    select: { id: true, firstName: true, lastName: true },
                },
                homework: {
                    include: {
                        lesson: {
                            include: {
                                group: { select: { id: true, name: true } },
                            },
                        },
                    },
                },
                lesson: {
                    include: {
                        group: { select: { id: true, name: true } },
                    },
                },
            },
            orderBy: { submittedAt: 'desc' },
            take: 200,
        });
        return submissions.map((s) => {
            const lesson = s.lesson || s.homework?.lesson;
            const groupName = lesson?.group?.name || 'Guruh';
            const lessonTopic = lesson?.topic || s.homework?.title || 'Dars vazifasi';
            return {
                id: s.id,
                homeworkId: s.homeworkId,
                lessonId: lesson?.id || s.lessonId,
                lessonTopic,
                groupName,
                student: s.student,
                textAnswer: s.textAnswer,
                fileUrls: s.fileUrls,
                fileUrl: s.fileUrl || (s.fileUrls.length > 0 ? s.fileUrls[0] : null),
                status: s.status,
                score: s.score,
                coinsEarned: s.coinsEarned,
                feedback: s.feedback,
                submittedAt: s.submittedAt,
                checkedAt: s.checkedAt,
                checkedBy: s.checkedBy,
            };
        });
    }
    async getTeacherDashboard(teacherId, role) {
        const isStaff = role === 'ADMIN' || role === 'SUPERADMIN';
        let groupIds = [];
        if (!isStaff) {
            const teacherGroups = await this.prisma.groupTeacher.findMany({
                where: { teacherId, status: 'ACTIVE' },
                select: { groupId: true },
            });
            groupIds = teacherGroups.map((tg) => tg.groupId);
        }
        const groupsWhere = isStaff
            ? { status: 'ACTIVE' }
            : { id: { in: groupIds }, status: 'ACTIVE' };
        const groupsCount = await this.prisma.group.count({ where: groupsWhere });
        const studentsCount = await this.prisma.groupStudent.count({
            where: isStaff
                ? { status: 'ACTIVE' }
                : { groupId: { in: groupIds }, status: 'ACTIVE' },
        });
        const subWhere = isStaff
            ? {}
            : {
                OR: [
                    { lesson: { groupId: { in: groupIds } } },
                    { homework: { lesson: { groupId: { in: groupIds } } } },
                ],
            };
        const pendingSubmissionsCount = await this.prisma.homeworkSubmission.count({
            where: {
                ...subWhere,
                status: 'PENDING',
            },
        });
        const checkedSubmissionsCount = await this.prisma.homeworkSubmission.count({
            where: {
                ...subWhere,
                status: { in: ['CHECKED', 'ACCEPTED'] },
            },
        });
        const groupsWithCourse = await this.prisma.group.findMany({
            where: groupsWhere,
            include: {
                course: { select: { price: true } },
                _count: { select: { students: { where: { status: 'ACTIVE' } } } },
            },
        });
        const totalPotentialRevenue = groupsWithCourse.reduce((acc, g) => {
            return acc + (Number(g.course?.price || 0) * g._count.students);
        }, 0);
        const totalTeacherEstimatedEarnings = Math.round(totalPotentialRevenue * 0.45);
        return {
            groupsCount,
            studentsCount,
            pendingSubmissionsCount,
            checkedSubmissionsCount,
            totalPotentialRevenue,
            totalTeacherEstimatedEarnings,
        };
    }
    async verifyTeacherGroupAccess(groupId, teacherId, role) {
        if (role === 'ADMIN' || role === 'SUPERADMIN')
            return true;
        const assignment = await this.prisma.groupTeacher.findFirst({
            where: {
                groupId,
                teacherId,
                status: 'ACTIVE',
            },
        });
        if (!assignment) {
            throw new ForbiddenException('Siz ushbu guruhga o\'qituvchi sifatida biriktirilmagansiz');
        }
        return true;
    }
};
TeacherService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TeacherService);
export { TeacherService };
//# sourceMappingURL=teacher.service.js.map