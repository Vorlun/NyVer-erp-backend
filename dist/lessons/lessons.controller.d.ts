import { LessonsService } from './lessons.service.js';
import { CreateLessonDto, UpdateLessonDto, QueryLessonDto } from './dto/create-lesson.dto.js';
import { CreateLessonMaterialDto, UpdateLessonMaterialDto } from './dto/lesson-material.dto.js';
export declare class LessonsController {
    private lessonsService;
    constructor(lessonsService: LessonsService);
    findAll(query: QueryLessonDto): Promise<({
        room: {
            id: number;
            name: string;
        } | null;
        group: {
            id: number;
            name: string;
        };
        homework: {
            title: string;
            id: number;
        } | null;
        _count: {
            attendances: number;
        };
        teacher: {
            id: number;
            firstName: string;
            lastName: string;
        } | null;
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
    })[]>;
    findOne(id: number): Promise<{
        room: {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            capacity: number;
        } | null;
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
        homework: ({
            submissions: {
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
            }[];
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
        }) | null;
        teacher: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        } | null;
        attendances: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.AttendanceStatus;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            coinsEarned: number;
            note: string | null;
            lessonId: number;
            markedById: number;
        })[];
        materials: {
            title: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            lessonId: number;
            fileUrl: string;
            fileType: string | null;
            sizeMb: number | null;
        }[];
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
    }>;
    create(dto: CreateLessonDto): Promise<{
        group: {
            id: number;
            name: string;
        };
        teacher: {
            id: number;
            firstName: string;
            lastName: string;
        } | null;
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
    }>;
    update(id: number, dto: UpdateLessonDto): Promise<{
        group: {
            id: number;
            name: string;
        };
        teacher: {
            id: number;
            firstName: string;
            lastName: string;
        } | null;
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
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addMaterial(lessonId: number, dto: CreateLessonMaterialDto): Promise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        lessonId: number;
        fileUrl: string;
        fileType: string | null;
        sizeMb: number | null;
    }>;
    updateMaterial(lessonId: number, materialId: number, dto: UpdateLessonMaterialDto): Promise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        lessonId: number;
        fileUrl: string;
        fileType: string | null;
        sizeMb: number | null;
    }>;
    removeMaterial(lessonId: number, materialId: number): Promise<{
        message: string;
    }>;
}
