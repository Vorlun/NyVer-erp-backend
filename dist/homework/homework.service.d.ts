import { PrismaService } from '../prisma/prisma.service.js';
import { CreateHomeworkDto, SubmitHomeworkDto, CheckSubmissionDto } from './dto/create-homework.dto.js';
export declare class HomeworkService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(lessonId?: number, groupId?: number): Promise<({
        lesson: {
            group: {
                id: number;
                name: string;
            };
            id: number;
            groupId: number;
            lessonOrder: number;
            topic: string;
        };
        _count: {
            submissions: number;
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
    })[]>;
    findAllSubmissions(studentId?: number): Promise<({
        homework: {
            title: string;
            id: number;
            maxScore: number;
            maxCoins: number;
        };
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
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
    })[]>;
    findOne(id: number): Promise<{
        lesson: {
            group: {
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
            } & {
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
            };
        } & {
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
            lessonDate: Date;
        };
        submissions: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
                photo: string | null;
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
        })[];
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
    }>;
    create(dto: CreateHomeworkDto): Promise<{
        lesson: {
            id: number;
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
    }>;
    update(id: number, dto: Partial<CreateHomeworkDto>): Promise<{
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
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    submit(homeworkId: number, studentId: number, dto: SubmitHomeworkDto): Promise<{
        student: {
            id: number;
            firstName: string;
            lastName: string;
        };
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
    }>;
    checkSubmission(submissionId: number, checkedById: number, dto: CheckSubmissionDto): Promise<{
        student: {
            id: number;
            firstName: string;
            lastName: string;
        };
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
    }>;
}
