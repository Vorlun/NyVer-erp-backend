import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUserDto } from './dto/query-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ChangeStatusDto } from './dto/change-status.dto.js';
import { TopUpBalanceDto } from '../payments/dto/create-payment.dto.js';
import type { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findAll(query: QueryUserDto) {
    const { role, status, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          email: true,
          phone: true,
          tempPassword: true,
          birthDate: true,
          photo: true,
          coins: true,
          address: true,
          status: true,
          created_at: true,
          updated_at: true,
          studentEnrollments: {
            include: {
              group: {
                select: {
                  id: true,
                  name: true,
                  status: true,
                },
              },
            },
          },
          teachingGroups: {
            include: {
              group: {
                select: {
                  id: true,
                  name: true,
                  status: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
        phone: true,
        tempPassword: true,
        birthDate: true,
        photo: true,
        coins: true,
        address: true,
        status: true,
        created_at: true,
        updated_at: true,
        studentEnrollments: {
          include: {
            group: {
              include: {
                course: true,
                room: true,
                teachers: { include: { teacher: true } },
              },
            },
          },
        },
        teachingGroups: {
          include: {
            group: {
              include: {
                course: true,
                room: true,
                _count: { select: { students: true } },
              },
            },
          },
        },
        payments: {
          orderBy: { created_at: 'desc' },
        },
        studentAttendances: {
          take: 30,
          orderBy: { created_at: 'desc' },
          include: {
            lesson: {
              include: { group: true },
            },
          },
        },
        coinTransactions: {
          take: 20,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Foydalanuvchi (ID: ${id}) topilmadi`);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const existingPhone = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existingPhone) {
      throw new ConflictException(
        "Bu telefon raqami allaqachon ro'yxatdan o'tgan",
      );
    }

    if (dto.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail) {
        throw new ConflictException("Bu email allaqachon ro'yxatdan o'tgan");
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        phone: dto.phone,
        email: dto.email || null,
        password: hashedPassword,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        address: dto.address || null,
        photo: dto.photo || null,
      },
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

    // Email mavjud bo'lsa, fonga parol o'rnatish havolasini yuborish
    if (user.email) {
      const login = user.email || user.phone;
      const inviteToken = await this.jwtService.signAsync(
        { sub: user.id, type: 'set-password' },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '24h',
        },
      );
      const frontendUrl =
        this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';
      const setPasswordUrl = `${frontendUrl}/set-password?token=${inviteToken}`;

      try {
        await this.mailService.sendAdminCreatedAccountEmail(
          user.email,
          `${user.firstName} ${user.lastName}`,
          login,
          setPasswordUrl,
        );
      } catch (err: any) {
        this.logger.error(`Email yuborishda xatolik: ${err.message}`, err.stack);
      }
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    if (dto.phone) {
      const existingPhone = await this.prisma.user.findFirst({
        where: { phone: dto.phone, NOT: { id } },
      });
      if (existingPhone) {
        throw new ConflictException(
          'Bu telefon raqami boshqa foydalanuvchiga tegishli',
        );
      }
    }

    if (dto.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (existingEmail) {
        throw new ConflictException('Bu email boshqa foydalanuvchiga tegishli');
      }
    }

    const data: Prisma.UserUpdateInput = {};

    if (dto.firstName !== undefined) data.firstName = dto.firstName;
    if (dto.lastName !== undefined) data.lastName = dto.lastName;
    if (dto.role !== undefined) data.role = dto.role;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.address !== undefined) data.address = dto.address;
    if (dto.photo !== undefined) data.photo = dto.photo;
    if (dto.birthDate !== undefined) data.birthDate = new Date(dto.birthDate);

    const user = await this.prisma.user.update({
      where: { id },
      data,
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

    return user;
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    await this.findOne(id);

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: "Parol muvaffaqiyatli o'zgartirildi" };
  }

  async changeStatus(id: number, dto: ChangeStatusDto) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: { status: dto.status },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    return user;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.user.delete({ where: { id } });

    return { message: `Foydalanuvchi (ID: ${id}) muvaffaqiyatli o'chirildi` };
  }

  async topUpBalance(userId: number, dto: TopUpBalanceDto) {
    await this.findOne(userId);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: dto.amount } },
      select: { id: true, firstName: true, lastName: true, balance: true },
    });

    return {
      success: true,
      message: `Balansga ${dto.amount.toLocaleString()} so'm qo'shildi`,
      userId: updated.id,
      fullName: `${updated.firstName} ${updated.lastName}`.trim(),
      newBalance: Number(updated.balance),
    };
  }
}
