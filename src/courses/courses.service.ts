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

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: { created_at: 'desc' },
      include: { _count: { select: { groups: true } } },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        groups: { include: { _count: { select: { students: true } } } },
        syllabus: { orderBy: { lessonOrder: 'asc' } },
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
}
