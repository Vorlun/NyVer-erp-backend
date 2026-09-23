import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateGroupDto,
  UpdateGroupDto,
  QueryGroupDto,
  AddStudentDto,
  AddTeacherDto,
} from './dto/create-group.dto.js';
import type { Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryGroupDto) {
    const where: Prisma.GroupWhereInput = {};

    if (query.courseId) where.courseId = query.courseId;
    if (query.status) where.status = query.status;
    if (query.teacherId) {
      where.teachers = { some: { teacherId: query.teacherId } };
    }

    return this.prisma.group.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        course: true,
        room: true,
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
        },
        students: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                status: true,
              },
            },
          },
        },
        _count: { select: { students: true, teachers: true, lessons: true } },
      },
    });
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            syllabus: {
              orderBy: { lessonOrder: 'asc' },
            },
          },
        },
        room: true,
        students: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                photo: true,
                coins: true,
                status: true,
                payments: {
                  orderBy: { created_at: 'desc' },
                  take: 5,
                },
              },
            },
          },
        },
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                photo: true,
                status: true,
              },
            },
          },
        },
        lessons: {
          orderBy: { lessonDate: 'asc' },
          take: 30,
        },
        _count: { select: { lessons: true, students: true, teachers: true } },
      },
    });

    if (!group) throw new NotFoundException(`Guruh (ID: ${id}) topilmadi`);
    return group;
  }

  async create(dto: CreateGroupDto) {
    const existing = await this.prisma.group.findUnique({
      where: { name: dto.name },
    });
    if (existing)
      throw new ConflictException('Bu nomdagi guruh allaqachon mavjud');

    const course = await this.prisma.course.findUnique({
      where: { id: dto.courseId },
    });
    if (!course) throw new NotFoundException('Kurs topilmadi');

    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
    });
    if (!room) throw new NotFoundException('Xona topilmadi');

    return this.prisma.group.create({
      data: {
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        startTime: dto.startTime,
        endTime: dto.endTime,
        maxStudents: dto.maxStudents ?? 15,
        weekDays: dto.weekDays,
        courseId: dto.courseId,
        roomId: dto.roomId,
        teachers: dto.teacherId
          ? {
              create: {
                teacherId: dto.teacherId,
                isMain: true,
              },
            }
          : undefined,
      },
      include: { course: true, room: true, teachers: { include: { teacher: true } } },
    });
  }

  async update(id: number, dto: UpdateGroupDto) {
    await this.findOne(id);

    if (dto.name) {
      const existing = await this.prisma.group.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (existing)
        throw new ConflictException('Bu nomdagi guruh allaqachon mavjud');
    }

    const data: Prisma.GroupUpdateInput = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.startDate !== undefined) data.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) data.endDate = new Date(dto.endDate);
    if (dto.startTime !== undefined) data.startTime = dto.startTime;
    if (dto.endTime !== undefined) data.endTime = dto.endTime;
    if (dto.maxStudents !== undefined) data.maxStudents = dto.maxStudents;
    if (dto.weekDays !== undefined) data.weekDays = dto.weekDays;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.roomId !== undefined) data.room = { connect: { id: dto.roomId } };
    if (dto.courseId !== undefined) data.course = { connect: { id: dto.courseId } };

    if (dto.teacherId !== undefined) {
      await this.prisma.groupTeacher.deleteMany({ where: { groupId: id } });
      if (dto.teacherId) {
        await this.prisma.groupTeacher.create({
          data: {
            groupId: id,
            teacherId: dto.teacherId,
            isMain: true,
          },
        });
      }
    }

    return this.prisma.group.update({
      where: { id },
      data,
      include: {
        course: true,
        room: true,
        teachers: { include: { teacher: true } },
        students: { include: { student: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.group.delete({ where: { id } });
    return { message: `Guruh (ID: ${id}) o'chirildi` };
  }

  async addStudent(groupId: number, dto: AddStudentDto) {
    const group = await this.findOne(groupId);

    const student = await this.prisma.user.findUnique({
      where: { id: dto.studentId },
    });
    if (!student || student.role !== 'STUDENT') {
      throw new BadRequestException(
        'Talaba topilmadi yoki foydalanuvchi talaba emas',
      );
    }

    const activeStudents = group.students.filter(
      (s) => s.status === 'ACTIVE',
    ).length;
    if (activeStudents >= group.maxStudents) {
      throw new BadRequestException(
        "Guruhda joy qolmagan (maksimal talabalar soni to'ldi)",
      );
    }

    const existing = await this.prisma.groupStudent.findUnique({
      where: { studentId_groupId: { studentId: dto.studentId, groupId } },
    });

    if (existing) {
      if (existing.status === 'ACTIVE') {
        throw new ConflictException('Bu talaba allaqachon guruhda');
      }
      return this.prisma.groupStudent.update({
        where: { id: existing.id },
        data: { status: 'ACTIVE' },
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, phone: true },
          },
        },
      });
    }

    return this.prisma.groupStudent.create({
      data: { studentId: dto.studentId, groupId },
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true, phone: true },
        },
      },
    });
  }

  async removeStudent(groupId: number, studentId: number) {
    const enrollment = await this.prisma.groupStudent.findUnique({
      where: { studentId_groupId: { studentId, groupId } },
    });

    if (!enrollment) throw new NotFoundException('Talaba bu guruhda topilmadi');

    await this.prisma.groupStudent.update({
      where: { id: enrollment.id },
      data: { status: 'INACTIVE' },
    });

    return { message: 'Talaba guruhdan chiqarildi' };
  }

  async addTeacher(groupId: number, dto: AddTeacherDto) {
    await this.findOne(groupId);

    const teacher = await this.prisma.user.findUnique({
      where: { id: dto.teacherId },
    });
    if (
      !teacher ||
      (teacher.role !== 'TEACHER' && teacher.role !== 'ASSISTANT')
    ) {
      throw new BadRequestException(
        "O'qituvchi topilmadi yoki foydalanuvchi o'qituvchi emas",
      );
    }

    const existing = await this.prisma.groupTeacher.findUnique({
      where: { teacherId_groupId: { teacherId: dto.teacherId, groupId } },
    });

    if (existing)
      throw new ConflictException("Bu o'qituvchi allaqachon guruhda");

    return this.prisma.groupTeacher.create({
      data: {
        teacherId: dto.teacherId,
        groupId,
        isMain: dto.isMain ?? true,
      },
      include: {
        teacher: {
          select: { id: true, firstName: true, lastName: true, phone: true },
        },
      },
    });
  }

  async removeTeacher(groupId: number, teacherId: number) {
    const assignment = await this.prisma.groupTeacher.findUnique({
      where: { teacherId_groupId: { teacherId, groupId } },
    });

    if (!assignment)
      throw new NotFoundException("O'qituvchi bu guruhda topilmadi");

    await this.prisma.groupTeacher.delete({ where: { id: assignment.id } });

    return { message: "O'qituvchi guruhdan olib tashlandi" };
  }
}
