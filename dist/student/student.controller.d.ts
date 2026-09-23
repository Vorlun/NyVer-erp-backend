import { StudentService } from './student.service.js';
import type { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    getDashboard(req: AuthenticatedRequest): Promise<{
        coins: number;
        xp: number;
        level: number;
        xpInLevel: number;
        xpToNext: number;
        rating: number;
        totalStudents: number;
        upcomingLessons: any[];
    }>;
    getGroups(req: AuthenticatedRequest): Promise<{
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
    getGroupLessons(groupId: number, req: AuthenticatedRequest): Promise<{
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
    getLesson(lessonId: number, req: AuthenticatedRequest): Promise<{
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
export {};
