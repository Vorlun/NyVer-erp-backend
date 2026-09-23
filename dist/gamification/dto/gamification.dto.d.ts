import { CoinReason, Status } from '@prisma/client';
export declare class AddCoinsDto {
    userId: number;
    amount: number;
    reason: CoinReason;
    description?: string;
}
export declare class CreatePrizeDto {
    name: string;
    description?: string;
    imageUrl?: string;
    priceCoins: number;
    stockCount?: number;
}
export declare class UpdatePrizeDto {
    name?: string;
    description?: string;
    imageUrl?: string;
    priceCoins?: number;
    stockCount?: number;
    status?: Status;
}
