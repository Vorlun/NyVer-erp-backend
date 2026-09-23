import { RoomsService } from './rooms.service.js';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto.js';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    findAll(): Promise<({
        _count: {
            groups: number;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        capacity: number;
    })[]>;
    findOne(id: number): Promise<{
        groups: {
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
        }[];
    } & {
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        capacity: number;
    }>;
    create(dto: CreateRoomDto): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        capacity: number;
    }>;
    update(id: number, dto: UpdateRoomDto): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        capacity: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
