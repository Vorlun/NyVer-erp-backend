import { GamificationService } from './gamification.service.js';
import { AddCoinsDto, CreatePrizeDto, UpdatePrizeDto } from './dto/gamification.dto.js';
import type { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class GamificationController {
    private gamificationService;
    constructor(gamificationService: GamificationService);
    getBalance(userId: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        coins: number;
    }>;
    getTransactions(userId?: string): Promise<({
        user: {
            id: number;
            firstName: string;
            lastName: string;
        };
    } & {
        description: string | null;
        id: number;
        created_at: Date;
        amount: number;
        reason: import("@prisma/client").$Enums.CoinReason;
        userId: number;
    })[]>;
    addCoins(dto: AddCoinsDto): Promise<{
        balance: number;
        transaction: {
            description: string | null;
            id: number;
            created_at: Date;
            amount: number;
            reason: import("@prisma/client").$Enums.CoinReason;
            userId: number;
        };
    }>;
    findAllPrizes(): Promise<{
        description: string | null;
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        imageUrl: string | null;
        priceCoins: number;
        stockCount: number;
    }[]>;
    createPrize(dto: CreatePrizeDto): Promise<{
        description: string | null;
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        imageUrl: string | null;
        priceCoins: number;
        stockCount: number;
    }>;
    updatePrize(id: number, dto: UpdatePrizeDto): Promise<{
        description: string | null;
        id: number;
        status: import("@prisma/client").$Enums.Status;
        created_at: Date;
        updated_at: Date;
        name: string;
        imageUrl: string | null;
        priceCoins: number;
        stockCount: number;
    }>;
    buyPrize(id: number, req: AuthenticatedRequest): Promise<{
        prize: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            imageUrl: string | null;
            priceCoins: number;
            stockCount: number;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        studentId: number;
        coinsSpent: number;
        isGiven: boolean;
        prizeId: number;
    }>;
    getOrders(studentId?: string): Promise<({
        prize: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            imageUrl: string | null;
            priceCoins: number;
            stockCount: number;
        };
        student: {
            id: number;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        studentId: number;
        coinsSpent: number;
        isGiven: boolean;
        prizeId: number;
    })[]>;
    markAsGiven(id: number): Promise<{
        prize: {
            description: string | null;
            id: number;
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            name: string;
            imageUrl: string | null;
            priceCoins: number;
            stockCount: number;
        };
        student: {
            id: number;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        studentId: number;
        coinsSpent: number;
        isGiven: boolean;
        prizeId: number;
    }>;
}
export {};
