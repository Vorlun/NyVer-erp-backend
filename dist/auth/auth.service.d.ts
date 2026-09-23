import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SetPasswordDto } from './dto/set-password.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
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
    refreshToken(refreshToken: string): Promise<{
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
    getProfile(userId: number): Promise<{
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
    setPassword(dto: SetPasswordDto): Promise<{
        message: string;
    }>;
    private generateTokens;
}
