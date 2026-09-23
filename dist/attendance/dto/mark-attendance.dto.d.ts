import { AttendanceStatus } from '@prisma/client';
export declare class AttendanceRecordDto {
    studentId: number;
    status: AttendanceStatus;
    coinsEarned?: number;
    note?: string;
}
export declare class BulkAttendanceDto {
    lessonId: number;
    records: AttendanceRecordDto[];
}
export declare class QueryAttendanceDto {
    lessonId?: number;
    studentId?: number;
    groupId?: number;
}
