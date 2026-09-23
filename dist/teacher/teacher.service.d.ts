import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLessonTeacherDto, GradeSubmissionDto, CreateTeacherHomeworkDto } from './dto/teacher.dto.js';
export declare class TeacherService {
    private prisma;
    constructor(prisma: PrismaService);
    getTeacherGroups(teacherId: number, role: string): Promise<{
        id: number;
        name: string;
        courseId: number;
        courseName: string;
        coursePrice: number;
        groupMonthlyRevenue: number;
        teacherEarnings: number;
        roomId: number;
        roomName: string;
        startTime: string;
        endTime: string;
        weekDays: import("@prisma/client").$Enums.WeekDay[];
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        studentsCount: number;
        lessonsCount: number;
        students: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
            photo: string | null;
            coins: number;
        }[];
        recentLessons: {
            id: number;
            topic: string;
            lessonOrder: number;
            lessonDate: string | null;
            videoUrl: string | null;
        }[];
    }[]>;
    getTeacherGroup(groupId: number, teacherId: number, role: string): Promise<{
        coursePrice: number;
        studentsCount: number;
        groupMonthlyRevenue: number;
        teacherEarnings: number;
        students: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
            photo: string | null;
            coins: number;
        }[];
        lessons: {
            id: number;
            lessonOrder: number;
            topic: string;
            description: string | null;
            content: string | null;
            videoUrl: string | null;
            attachedFiles: string[];
            lessonDate: string | null;
            startTime: string | null;
            endTime: string | null;
            homework: {
                id: number;
                title: string;
                task: string;
                maxScore: number;
                submissionsCount: number;
            } | null;
        }[];
        course: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            durationMonths: number;
            lessonsPerMonth: number;
            totalLessons: number;
        };
        room: {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            capacity: number;
        };
        id: number;
        status: import("@prisma/client").$Enums.GroupStatus;
        created_at: Date;
        updated_at: Date;
        name: string;
        courseId: number;
        startDate: Date;
        endDate: Date | null;
        startTime: string;
        endTime: string;
        maxStudents: number;
        weekDays: import("@prisma/client").$Enums.WeekDay[];
        roomId: number;
    }>;
    createLesson(groupId: number, teacherId: number, role: string, dto: CreateLessonTeacherDto): Promise<{
        message: string;
        lesson: {
            lessonDate: string;
            homework: any;
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            content: string | null;
            startTime: string | null;
            endTime: string | null;
            roomId: number | null;
            groupId: number;
            teacherId: number | null;
            lessonOrder: number;
            topic: string;
            videoUrl: string | null;
            attachedFiles: string[];
        };
    }>;
    createHomework(groupId: number, teacherId: number, role: string, dto: CreateTeacherHomeworkDto): Promise<{
        message: string;
        homework: {
            lesson: {
                id: number;
                lessonOrder: number;
                topic: string;
            };
        } & {
            title: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            lessonId: number;
            fileUrls: string[];
            task: string;
            maxScore: number;
            maxCoins: number;
            deadline: Date | null;
        };
    }>;
    getLessonSubmissions(lessonId: number, teacherId: number, role: string): Promise<{
        id: number;
        homeworkId: number;
        lessonId: number;
        lessonTopic: string;
        groupName: string;
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
            photo: string | null;
            coins: number;
        };
        textAnswer: string | null;
        fileUrls: string[];
        fileUrl: string | null;
        status: import("@prisma/client").$Enums.HomeworkSubmissionStatus;
        score: number | null;
        coinsEarned: number;
        feedback: string | null;
        submittedAt: Date;
        checkedAt: Date | null;
        checkedBy: {
            id: number;
            firstName: string;
            lastName: string;
        } | null;
    }[]>;
    gradeSubmission(submissionId: number, teacherId: number, dto: GradeSubmissionDto): Promise<{
        message: string;
        submission: {
            student: {
                id: number;
                firstName: string;
                lastName: string;
                coins: number;
            };
            checkedBy: {
                id: number;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            id: number;
            status: import("@prisma/client").$Enums.HomeworkSubmissionStatus;
            updated_at: Date;
            studentId: number;
            coinsEarned: number;
            lessonId: number | null;
            textAnswer: string | null;
            fileUrls: string[];
            fileUrl: string | null;
            score: number | null;
            feedback: string | null;
            submittedAt: Date;
            checkedAt: Date | null;
            homeworkId: number;
            checkedById: number | null;
        };
    }>;
    getAllSubmissions(teacherId: number, role: string, status?: string): Promise<{
        id: number;
        homeworkId: number;
        lessonId: number | null;
        lessonTopic: string;
        groupName: string;
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
            photo: string | null;
            coins: number;
        };
        textAnswer: string | null;
        fileUrls: string[];
        fileUrl: string | null;
        status: import("@prisma/client").$Enums.HomeworkSubmissionStatus;
        score: number | null;
        coinsEarned: number;
        feedback: string | null;
        submittedAt: Date;
        checkedAt: Date | null;
        checkedBy: {
            id: number;
            firstName: string;
            lastName: string;
        } | null;
    }[]>;
    getTeacherDashboard(teacherId: number, role: string): Promise<{
        groupsCount: number;
        studentsCount: number;
        pendingSubmissionsCount: number;
        checkedSubmissionsCount: number;
        totalPotentialRevenue: number;
        totalTeacherEstimatedEarnings: number;
    }>;
    private verifyTeacherGroupAccess;
}
