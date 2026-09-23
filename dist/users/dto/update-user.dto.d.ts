import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    role?: Role;
    phone?: string;
    email?: string;
    birthDate?: string;
    address?: string;
    photo?: string;
}
