import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { SetPasswordDto } from './dto/set-password.dto.js';
import type { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
    }>;
    setPassword(dto: SetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(req: AuthenticatedRequest): Promise<{
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
}
export {};
