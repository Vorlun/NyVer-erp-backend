import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateExamDto,
  UpdateExamDto,
  ExamResultDto,
} from './dto/create-exam.dto.js';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(groupId?: number) {
    const where = groupId ? { groupId } : {};
    return this.prisma.exam.findMany({
      where,
      orderBy: { examDate: 'desc' },
      include: {
        group: { select: { id: true, name: true } },
        _count: { select: { results: true } },
      },
    });
  }

  async findOne(id: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        group: { select: { id: true, name: true } },
        results: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!exam) throw new NotFoundException(`Imtihon (ID: ${id}) topilmadi`);
    return exam;
  }

  async create(dto: CreateExamDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!group) throw new NotFoundException('Guruh topilmadi');

    return this.prisma.exam.create({
      data: {
        title: dto.title,
        examDate: new Date(dto.examDate),
        maxScore: dto.maxScore ?? 100,
        groupId: dto.groupId,
      },
    });
  }

  async update(id: number, dto: UpdateExamDto) {
    await this.findOne(id);

    return this.prisma.exam.update({
      where: { id },
      data: {
        title: dto.title,
        examDate: dto.examDate ? new Date(dto.examDate) : undefined,
        maxScore: dto.maxScore,
        groupId: dto.groupId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.exam.delete({ where: { id } });
    return { message: `Imtihon (ID: ${id}) o'chirildi` };
  }

  // --- EXAM RESULTS ---
  async setResults(examId: number, results: ExamResultDto[]) {
    const exam = await this.findOne(examId);

    // Barcha eskisini o'chirib yangidan yozamiz
    await this.prisma.examResult.deleteMany({
      where: { examId },
    });

    if (results.length > 0) {
      await this.prisma.$transaction(async (tx) => {
        for (const r of results) {
          await tx.examResult.create({
            data: {
              examId,
              studentId: r.studentId,
              score: r.score,
            },
          });

          // Exam balliga qarab coin hisoblash:
          // 90+ ball: 3 coin
          // 70-89 ball: 2 coin
          // 60-69 ball: 1 coin
          const coinsEarned =
            r.score >= 90 ? 3 : r.score >= 70 ? 2 : r.score >= 60 ? 1 : 0;

          if (coinsEarned > 0) {
            await tx.user.update({
              where: { id: r.studentId },
              data: { coins: { increment: coinsEarned } },
            });

            await tx.coinTransaction.create({
              data: {
                amount: coinsEarned,
                reason: 'EXAM_TOP',
                description: `${exam.title} imtihoni natijasi: ${r.score} ball`,
                userId: r.studentId,
              },
            });
          }
        }
      });
    }

    return this.findOne(examId);
  }
}
