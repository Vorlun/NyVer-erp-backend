import { Status } from '@prisma/client';
export declare class CreateRoomDto {
    name: string;
    capacity: number;
}
export declare class UpdateRoomDto {
    name?: string;
    capacity?: number;
    status?: Status;
}
