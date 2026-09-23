import { Role, Status } from '@prisma/client';
export declare class QueryUserDto {
    role?: Role;
    status?: Status;
    search?: string;
    page?: number;
    limit?: number;
}
