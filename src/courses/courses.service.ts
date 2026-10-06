import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto.js';
import {
  CreateCourseSyllabusDto,
  UpdateCourseSyllabusDto,
} from './dto/course-syllabus.dto.js';

import {
  CreateCoursePlanDto,
  UpdateCoursePlanDto,
} from './dto/course-plan.dto.js';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        _count: { select: { groups: true } },
        syllabus: { orderBy: { lessonOrder: 'asc' } },
        plans: {
          include: {
            lessons: { orderBy: { lessonOrder: 'asc' } },
            _count: { select: { groups: true } },
          },
          orderBy: { id: 'asc' },
        },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        groups: { include: { _count: { select: { students: true } } } },
        syllabus: { orderBy: { lessonOrder: 'asc' } },
        plans: {
          include: {
            lessons: { orderBy: { lessonOrder: 'asc' } },
            _count: { select: { groups: true } },
          },
          orderBy: { id: 'asc' },
        },
      },
    });
    if (!course) throw new NotFoundException(`Kurs (ID: ${id}) topilmadi`);
    return course;
  }

  async create(dto: CreateCourseDto) {
    const existing = await this.prisma.course.findUnique({
      where: { name: dto.name },
    });
    if (existing)
      throw new ConflictException('Bu nomdagi kurs allaqachon mavjud');

    return this.prisma.course.create({
      data: {
        name: dto.name,
        description: dto.description || null,
        price: dto.price,
        durationMonths: dto.durationMonths ?? 1,
        lessonsPerMonth: dto.lessonsPerMonth ?? 12,
        totalLessons: dto.totalLessons ?? 12,
      },
    });
  }

  async update(id: number, dto: UpdateCourseDto) {
    await this.findOne(id);

    if (dto.name) {
      const existing = await this.prisma.course.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (existing)
        throw new ConflictException('Bu nomdagi kurs allaqachon mavjud');
    }

    return this.prisma.course.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.course.delete({ where: { id } });
    return { message: `Kurs (ID: ${id}) o'chirildi` };
  }

  // --- SYLLABUS ---
  async addSyllabus(courseId: number, dto: CreateCourseSyllabusDto) {
    await this.findOne(courseId); // verify course exists
    return this.prisma.courseSyllabus.create({
      data: {
        courseId,
        ...dto,
      },
    });
  }

  async updateSyllabus(
    courseId: number,
    syllabusId: number,
    dto: UpdateCourseSyllabusDto,
  ) {
    const syllabus = await this.prisma.courseSyllabus.findUnique({
      where: { id: syllabusId },
    });
    if (!syllabus || syllabus.courseId !== courseId) {
      throw new NotFoundException('Syllabus topilmadi');
    }

    return this.prisma.courseSyllabus.update({
      where: { id: syllabusId },
      data: dto,
    });
  }

  async removeSyllabus(courseId: number, syllabusId: number) {
    const syllabus = await this.prisma.courseSyllabus.findUnique({
      where: { id: syllabusId },
    });
    if (!syllabus || syllabus.courseId !== courseId) {
      throw new NotFoundException('Syllabus topilmadi');
    }

    await this.prisma.courseSyllabus.delete({ where: { id: syllabusId } });
    return { message: "Syllabus o'chirildi" };
  }

  async batchSetSyllabus(
    courseId: number,
    items: { lessonOrder: number; topic: string; description?: string }[],
  ) {
    await this.findOne(courseId);
    await this.prisma.courseSyllabus.deleteMany({ where: { courseId } });
    if (items && items.length > 0) {
      await this.prisma.courseSyllabus.createMany({
        data: items.map((item, idx) => ({
          courseId,
          lessonOrder: item.lessonOrder || (idx + 1),
          topic: item.topic,
          description: item.description || null,
        })),
      });
    }
    return this.prisma.courseSyllabus.findMany({
      where: { courseId },
      orderBy: { lessonOrder: 'asc' },
    });
  }

  // --- COURSE PLANS (Bir nechta o'quv rejalari) ---
  async getCoursePlans(courseId: number) {
    await this.findOne(courseId);
    return this.prisma.coursePlan.findMany({
      where: { courseId },
      include: {
        lessons: { orderBy: { lessonOrder: 'asc' } },
        _count: { select: { groups: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async createCoursePlan(courseId: number, dto: CreateCoursePlanDto) {
    await this.findOne(courseId);

    if (dto.isDefault) {
      await this.prisma.coursePlan.updateMany({
        where: { courseId },
        data: { isDefault: false },
      });
    }

    const plan = await this.prisma.coursePlan.create({
      data: {
        title: dto.title,
        description: dto.description || null,
        isDefault: dto.isDefault ?? false,
        courseId,
        lessons:
          dto.lessons && dto.lessons.length > 0
            ? {
                create: dto.lessons.map((l, idx) => ({
                  lessonOrder: l.lessonOrder || idx + 1,
                  topic: l.topic,
                  description: l.description || null,
                })),
              }
            : undefined,
      },
      include: {
        lessons: { orderBy: { lessonOrder: 'asc' } },
        _count: { select: { groups: true } },
      },
    });

    return plan;
  }

  async updateCoursePlan(
    courseId: number,
    planId: number,
    dto: UpdateCoursePlanDto,
  ) {
    const plan = await this.prisma.coursePlan.findUnique({
      where: { id: planId },
    });
    if (!plan || plan.courseId !== courseId) {
      throw new NotFoundException("O'quv reja topilmadi");
    }

    if (dto.isDefault) {
      await this.prisma.coursePlan.updateMany({
        where: { courseId, id: { not: planId } },
        data: { isDefault: false },
      });
    }

    if (dto.lessons !== undefined) {
      await this.prisma.coursePlanLesson.deleteMany({
        where: { planId },
      });
      if (dto.lessons.length > 0) {
        await this.prisma.coursePlanLesson.createMany({
          data: dto.lessons.map((l, idx) => ({
            planId,
            lessonOrder: l.lessonOrder || idx + 1,
            topic: l.topic,
            description: l.description || null,
          })),
        });
      }
    }

    return this.prisma.coursePlan.update({
      where: { id: planId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.isDefault !== undefined && { isDefault: dto.isDefault }),
      },
      include: {
        lessons: { orderBy: { lessonOrder: 'asc' } },
        _count: { select: { groups: true } },
      },
    });
  }

  async deleteCoursePlan(courseId: number, planId: number) {
    const plan = await this.prisma.coursePlan.findUnique({
      where: { id: planId },
    });
    if (!plan || plan.courseId !== courseId) {
      throw new NotFoundException("O'quv reja topilmadi");
    }

    await this.prisma.coursePlan.delete({
      where: { id: planId },
    });
    return { message: "O'quv reja muvaffaqiyatli o'chirildi" };
  }
}
