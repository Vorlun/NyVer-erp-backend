import { PrismaService } from '../prisma/prisma.service.js';
export declare class StudentService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboard(studentId: number): Promise<{
        coins: number;
        xp: number;
        level: number;
        xpInLevel: number;
        xpToNext: number;
        rating: number;
        totalStudents: number;
        upcomingLessons: any[];
    }>;
    getStudentGroups(studentId: number): Promise<{
        id: number;
        name: string;
        status: import("@prisma/client").$Enums.GroupStatus;
        courseName: string;
        teacherName: string;
        startTime: string;
        endTime: string;
        weekDays: import("@prisma/client").$Enums.WeekDay[];
        totalLessons: number;
        completedLessons: number;
        progressPercent: number;
    }[]>;
    getGroupLessons(studentId: number, groupId: number): Promise<{
        id: any;
        lessonOrder: any;
        topic: any;
        description: any;
        lessonDate: string | null;
        startTime: any;
        endTime: any;
        status: any;
        hasHomework: boolean;
        homeworkId: any;
    }[]>;
    getLesson(studentId: number, lessonId: number): Promise<{
        id: number;
        lessonOrder: number;
        topic: string;
        description: string | null;
        content: string | null;
        videoUrl: string | null;
        lessonDate: string | null;
        startTime: string | null;
        endTime: string | null;
        status: string;
        groupId: number;
        groupName: string;
        materials: {
            id: number;
            title: string;
            fileUrl: string;
            fileType: string | null;
        }[];
        homework: {
            id: number;
            title: string;
            task: string;
            maxScore: number;
            deadline: Date | null;
            mySubmission: {
                id: number;
                status: import("@prisma/client").$Enums.HomeworkSubmissionStatus;
                submittedAt: Date;
            };
        } | null;
    }>;
}
