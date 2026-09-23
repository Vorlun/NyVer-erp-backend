import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUserDto } from './dto/query-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ChangeStatusDto } from './dto/change-status.dto.js';
import { TopUpBalanceDto } from '../payments/dto/create-payment.dto.js';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(query: QueryUserDto): Promise<{
        data: {
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
            address: string | null;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            studentEnrollments: ({
                group: {
                    id: number;
                    status: import("@prisma/client").$Enums.GroupStatus;
                    name: string;
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
            teachingGroups: ({
                group: {
                    id: number;
                    status: import("@prisma/client").$Enums.GroupStatus;
                    name: string;
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
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
        address: string | null;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        studentEnrollments: ({
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
                        balance: import("@prisma/client/runtime/library").Decimal;
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
        teachingGroups: ({
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
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            groupId: number;
            isMain: boolean;
            teacherId: number;
        })[];
        studentAttendances: ({
            lesson: {
                group: {
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
        coinTransactions: {
            description: string | null;
            id: number;
            created_at: Date;
            amount: number;
            reason: import("@prisma/client").$Enums.CoinReason;
            userId: number;
        }[];
        payments: {
            type: import("@prisma/client").$Enums.PaymentType;
            id: number;
            status: import("@prisma/client").$Enums.PaymentStatus;
            created_at: Date;
            updated_at: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paidForDate: Date;
            comment: string | null;
            studentId: number;
            courseId: number | null;
            receiptUrl: string | null;
        }[];
    }>;
    create(dto: CreateUserDto): Promise<{
        id: number;
        email: string | null;
        phone: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.Role;
        birthDate: Date | null;
        photo: string | null;
        coins: number;
        address: string | null;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        id: number;
        email: string | null;
        phone: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.Role;
        birthDate: Date | null;
        photo: string | null;
        coins: number;
        address: string | null;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
    }>;
    changeStatus(id: number, dto: ChangeStatusDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.Status;
    }>;
    changePassword(id: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    topUpBalance(id: number, dto: TopUpBalanceDto): Promise<{
        success: boolean;
        message: string;
        userId: number;
        fullName: string;
        newBalance: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
