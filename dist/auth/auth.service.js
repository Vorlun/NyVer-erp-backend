var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(dto) {
        const cleanLogin = dto.login.trim().toLowerCase().replace(/[\s-]/g, '');
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { phone: { contains: cleanLogin } },
                    {
                        email: {
                            equals: dto.login.trim().toLowerCase(),
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
        if (!user) {
            throw new UnauthorizedException('Foydalanuvchi topilmadi. Loginni tekshiring.');
        }
        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedException("Ushbu hisob faol emas. Ma'muriyatga murojaat qiling.");
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Parol noto'g'ri.");
        }
        const tokens = await this.generateTokens(user.id, user.role);
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            ...tokens,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            if (payload.type !== 'refresh') {
                throw new UnauthorizedException("Noto'g'ri token turi");
            }
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user || user.status !== 'ACTIVE') {
                throw new UnauthorizedException('Foydalanuvchi topilmadi yoki faol emas');
            }
            const tokens = await this.generateTokens(user.id, user.role);
            const { password: _, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                ...tokens,
            };
        }
        catch {
            throw new UnauthorizedException("Refresh token yaroqsiz yoki muddati o'tgan");
        }
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                email: true,
                phone: true,
                birthDate: true,
                photo: true,
                coins: true,
                address: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        if (!user) {
            throw new UnauthorizedException('Foydalanuvchi topilmadi');
        }
        return user;
    }
    async setPassword(dto) {
        let payload;
        try {
            payload = this.jwtService.verify(dto.token, {
                secret: this.configService.get('JWT_SECRET'),
            });
        }
        catch {
            throw new BadRequestException("Havola yaroqsiz yoki muddati o'tgan");
        }
        if (payload?.type !== 'set-password') {
            throw new BadRequestException("Noto'g'ri token turi");
        }
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });
        if (!user) {
            throw new BadRequestException('Foydalanuvchi topilmadi');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                status: 'ACTIVE',
            },
        });
        return { message: "Parol muvaffaqiyatli o'rnatildi. Endi tizimga kirishingiz mumkin." };
    }
    async generateTokens(userId, role) {
        const accessPayload = { sub: userId, role, type: 'access' };
        const refreshPayload = { sub: userId, role, type: 'refresh' };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessPayload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: 900,
            }),
            this.jwtService.signAsync(refreshPayload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: 604800,
            }),
        ]);
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map