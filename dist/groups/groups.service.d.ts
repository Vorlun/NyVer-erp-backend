import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGroupDto, UpdateGroupDto, QueryGroupDto, AddStudentDto, AddTeacherDto } from './dto/create-group.dto.js';
import type { Prisma } from '@prisma/client';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryGroupDto): Promise<({
        course: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            price: Prisma.Decimal;
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
        _count: {
            students: number;
            teachers: number;
            lessons: number;
        };
        students: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
                status: import("@prisma/client").$Enums.Status;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            joinedAt: Date;
            groupId: number;
        })[];
        teachers: ({
            teacher: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            groupId: number;
            isMain: boolean;
            teacherId: number;
        })[];
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
    })[]>;
    findOne(id: number): Promise<{
        course: {
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
            price: Prisma.Decimal;
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
        _count: {
            students: number;
            teachers: number;
            lessons: number;
        };
        students: ({
            student: {
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                photo: string | null;
                coins: number;
                status: import("@prisma/client").$Enums.Status;
                payments: {
                    type: import("@prisma/client").$Enums.PaymentType;
                    id: number;
                    status: import("@prisma/client").$Enums.PaymentStatus;
                    created_at: Date;
                    updated_at: Date;
                    amount: Prisma.Decimal;
                    paidForDate: Date;
                    comment: string | null;
                    studentId: number;
                    courseId: number | null;
                    receiptUrl: string | null;
                }[];
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            joinedAt: Date;
            groupId: number;
        })[];
        teachers: ({
            teacher: {
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                photo: string | null;
                status: import("@prisma/client").$Enums.Status;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            groupId: number;
            isMain: boolean;
            teacherId: number;
        })[];
        lessons: {
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
        }[];
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
    }>;
    create(dto: CreateGroupDto): Promise<{
        course: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            price: Prisma.Decimal;
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
        teachers: ({
            teacher: {
                password: string;
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                role: import("@prisma/client").$Enums.Role;
                birthDate: Date | null;
                tempPassword: string | null;
                photo: string | null;
                coins: number;
                balance: Prisma.Decimal;
                address: string | null;
                status: import("@prisma/client").$Enums.Status;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            groupId: number;
            isMain: boolean;
            teacherId: number;
        })[];
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
    }>;
    update(id: number, dto: UpdateGroupDto): Promise<{
        course: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            price: Prisma.Decimal;
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
        students: ({
            student: {
                password: string;
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                role: import("@prisma/client").$Enums.Role;
                birthDate: Date | null;
                tempPassword: string | null;
                photo: string | null;
                coins: number;
                balance: Prisma.Decimal;
                address: string | null;
                status: import("@prisma/client").$Enums.Status;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            joinedAt: Date;
            groupId: number;
        })[];
        teachers: ({
            teacher: {
                password: string;
                id: number;
                email: string | null;
                phone: string;
                firstName: string;
                lastName: string;
                role: import("@prisma/client").$Enums.Role;
                birthDate: Date | null;
                tempPassword: string | null;
                photo: string | null;
                coins: number;
                balance: Prisma.Decimal;
                address: string | null;
                status: import("@prisma/client").$Enums.Status;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            groupId: number;
            isMain: boolean;
            teacherId: number;
        })[];
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
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addStudent(groupId: number, dto: AddStudentDto): Promise<{
        student: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        studentId: number;
        joinedAt: Date;
        groupId: number;
    }>;
    removeStudent(groupId: number, studentId: number): Promise<{
        message: string;
    }>;
    addTeacher(groupId: number, dto: AddTeacherDto): Promise<{
        teacher: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        isMain: boolean;
        teacherId: number;
    }>;
    removeTeacher(groupId: number, teacherId: number): Promise<{
        message: string;
    }>;
}
