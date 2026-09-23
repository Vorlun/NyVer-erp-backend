import { AttendanceService } from './attendance.service.js';
import { BulkAttendanceDto, QueryAttendanceDto } from './dto/mark-attendance.dto.js';
import type { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
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
    bulkMark(dto: BulkAttendanceDto, req: AuthenticatedRequest): Promise<({
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
export {};
