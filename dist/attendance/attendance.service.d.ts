import { PrismaService } from '../prisma/prisma.service.js';
import { BulkAttendanceDto, QueryAttendanceDto } from './dto/mark-attendance.dto.js';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryAttendanceDto): Promise<({
        lesson: {
            id: number;
            groupId: number;
            lessonOrder: number;
            topic: string;
            lessonDate: Date;
        };
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
        markedBy: {
            id: number;
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
    })[]>;
    bulkMark(dto: BulkAttendanceDto, markedById: number): Promise<({
        student: {
            id: number;
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
    })[]>;
    getGroupReport(groupId: number): Promise<{
        group: {
            id: number;
            name: string;
        };
        lessons: {
            id: number;
            lessonOrder: number;
            topic: string;
            lessonDate: Date;
        }[];
        report: {
            student: {
                id: number;
                firstName: string;
                lastName: string;
            };
            totalLessons: number;
            present: number;
            late: number;
            absent: number;
            excused: number;
            percentage: number;
        }[];
    }>;
}
