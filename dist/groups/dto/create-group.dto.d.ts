import { GroupStatus, WeekDay } from '@prisma/client';
export declare class CreateGroupDto {
    name: string;
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime: string;
    maxStudents?: number;
    weekDays: WeekDay[];
    courseId: number;
    roomId: number;
    teacherId?: number;
}
export declare class UpdateGroupDto {
    name?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    maxStudents?: number;
    weekDays?: WeekDay[];
    status?: GroupStatus;
    roomId?: number;
    courseId?: number;
    teacherId?: number;
}
export declare class QueryGroupDto {
    courseId?: number;
    status?: GroupStatus;
    teacherId?: number;
}
export declare class AddStudentDto {
    studentId: number;
}
export declare class AddTeacherDto {
    teacherId: number;
    isMain?: boolean;
}
