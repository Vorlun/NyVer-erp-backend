import { PrismaService } from '../prisma/prisma.service.js';
import { AddCoinsDto, CreatePrizeDto, UpdatePrizeDto } from './dto/gamification.dto.js';
export declare class GamificationService {
    private prisma;
    constructor(prisma: PrismaService);
    getBalance(userId: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        coins: number;
    }>;
    getTransactions(userId?: number): Promise<({
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
    buyPrize(prizeId: number, studentId: number): Promise<{
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
    getOrders(studentId?: number): Promise<({
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
    markOrderAsGiven(orderId: number): Promise<{
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
