import { Role } from '@prisma/client';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    role: Role;
    phone: string;
    email?: string;
    password: string;
    birthDate?: string;
    address?: string;
    photo?: string;
}
