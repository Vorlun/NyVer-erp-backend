import { Status } from '@prisma/client';
export declare class CreateCourseDto {
    name: string;
    description?: string;
    price: number;
    durationMonths?: number;
    lessonsPerMonth?: number;
    totalLessons?: number;
}
export declare class UpdateCourseDto {
    name?: string;
    description?: string;
    price?: number;
    durationMonths?: number;
    lessonsPerMonth?: number;
    totalLessons?: number;
    status?: Status;
}
