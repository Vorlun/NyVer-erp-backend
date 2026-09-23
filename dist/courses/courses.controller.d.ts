import { CoursesService } from './courses.service.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto.js';
import { CreateCourseSyllabusDto, UpdateCourseSyllabusDto } from './dto/course-syllabus.dto.js';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<({
        _count: {
            groups: number;
        };
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
        groups: ({
            _count: {
                students: number;
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
        })[];
        syllabus: {
            description: string | null;
            id: number;
            courseId: number;
            lessonOrder: number;
            topic: string;
        }[];
    } & {
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
    }>;
    create(dto: CreateCourseDto): Promise<{
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
    }>;
    update(id: number, dto: UpdateCourseDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addSyllabus(courseId: number, dto: CreateCourseSyllabusDto): Promise<{
        description: string | null;
        id: number;
        courseId: number;
        lessonOrder: number;
        topic: string;
    }>;
    updateSyllabus(courseId: number, syllabusId: number, dto: UpdateCourseSyllabusDto): Promise<{
        description: string | null;
        id: number;
        courseId: number;
        lessonOrder: number;
        topic: string;
    }>;
    removeSyllabus(courseId: number, syllabusId: number): Promise<{
        message: string;
    }>;
}
