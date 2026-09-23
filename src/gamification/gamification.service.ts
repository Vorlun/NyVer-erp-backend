import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  AddCoinsDto,
  CreatePrizeDto,
  UpdatePrizeDto,
} from './dto/gamification.dto.js';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, firstName: true, lastName: true, coins: true },
    });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    return user;
  }

  async getTransactions(userId?: number) {
    const where = userId ? { userId } : {};
    return this.prisma.coinTransaction.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 100,
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async addCoins(dto: AddCoinsDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const newBalance = user.coins + dto.amount;
    if (newBalance < 0) {
      throw new BadRequestException(
        "Tangalar yetarli emas (balans manfiy bo'la olmaydi)",
      );
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: dto.userId },
        data: { coins: newBalance },
      });

      const transaction = await tx.coinTransaction.create({
        data: {
          amount: dto.amount,
          reason: dto.reason,
          description: dto.description || null,
          userId: dto.userId,
        },
      });

      return { balance: newBalance, transaction };
    });
  }

  // Prizes
  async findAllPrizes() {
    return this.prisma.prize.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { priceCoins: 'asc' },
    });
  }

  async createPrize(dto: CreatePrizeDto) {
    return this.prisma.prize.create({
      data: {
        name: dto.name,
        description: dto.description || null,
        imageUrl: dto.imageUrl || null,
        priceCoins: dto.priceCoins,
        stockCount: dto.stockCount ?? 0,
      },
    });
  }

  async updatePrize(id: number, dto: UpdatePrizeDto) {
    const prize = await this.prisma.prize.findUnique({ where: { id } });
    if (!prize) throw new NotFoundException('Sovrin topilmadi');

    return this.prisma.prize.update({ where: { id }, data: dto });
  }

  async buyPrize(prizeId: number, studentId: number) {
    const [prize, user] = await Promise.all([
      this.prisma.prize.findUnique({ where: { id: prizeId } }),
      this.prisma.user.findUnique({ where: { id: studentId } }),
    ]);

    if (!prize) throw new NotFoundException('Sovrin topilmadi');
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    if (prize.status !== 'ACTIVE')
      throw new BadRequestException('Sovrin hozirda mavjud emas');
    if (prize.stockCount <= 0)
      throw new BadRequestException('Sovrin zaxirasi tugagan');
    if (user.coins < prize.priceCoins)
      throw new BadRequestException('Tangalar yetarli emas');

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: studentId },
        data: { coins: { decrement: prize.priceCoins } },
      });

      await tx.prize.update({
        where: { id: prizeId },
        data: { stockCount: { decrement: 1 } },
      });

      await tx.coinTransaction.create({
        data: {
          amount: -prize.priceCoins,
          reason: 'PRIZE_PURCHASE',
          description: `${prize.name} sovrini xaridi`,
          userId: studentId,
        },
      });

      const order = await tx.prizeOrder.create({
        data: {
          studentId,
          prizeId,
          coinsSpent: prize.priceCoins,
        },
        include: { prize: true },
      });

      return order;
    });
  }

  async getOrders(studentId?: number) {
    const where = studentId ? { studentId } : {};
    return this.prisma.prizeOrder.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        student: { select: { id: true, firstName: true, lastName: true } },
        prize: true,
      },
    });
  }

  async markOrderAsGiven(orderId: number) {
    const order = await this.prisma.prizeOrder.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Buyurtma topilmadi');

    return this.prisma.prizeOrder.update({
      where: { id: orderId },
      data: { isGiven: true },
      include: {
        student: { select: { id: true, firstName: true, lastName: true } },
        prize: true,
      },
    });
  }
}
