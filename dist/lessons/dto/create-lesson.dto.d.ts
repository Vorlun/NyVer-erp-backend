import { Status } from '@prisma/client';
export declare class CreateLessonDto {
    lessonOrder: number;
    topic: string;
    description?: string;
    videoUrl?: string;
    content?: string;
    lessonDate: string;
    startTime?: string;
    endTime?: string;
    groupId: number;
    teacherId?: number;
    roomId?: number;
}
export declare class UpdateLessonDto {
    topic?: string;
    description?: string;
    videoUrl?: string;
    content?: string;
    lessonDate?: string;
    startTime?: string;
    endTime?: string;
    teacherId?: number;
    roomId?: number;
    status?: Status;
}
export declare class QueryLessonDto {
    groupId?: number;
    teacherId?: number;
    dateFrom?: string;
    dateTo?: string;
}
