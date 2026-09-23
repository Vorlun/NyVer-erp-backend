var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.course.findMany({
            orderBy: { created_at: 'desc' },
            include: { _count: { select: { groups: true } } },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                groups: { include: { _count: { select: { students: true } } } },
                syllabus: { orderBy: { lessonOrder: 'asc' } },
            },
        });
        if (!course)
            throw new NotFoundException(`Kurs (ID: ${id}) topilmadi`);
        return course;
    }
    async create(dto) {
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
    async update(id, dto) {
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.course.delete({ where: { id } });
        return { message: `Kurs (ID: ${id}) o'chirildi` };
    }
    async addSyllabus(courseId, dto) {
        await this.findOne(courseId);
        return this.prisma.courseSyllabus.create({
            data: {
                courseId,
                ...dto,
            },
        });
    }
    async updateSyllabus(courseId, syllabusId, dto) {
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
    async removeSyllabus(courseId, syllabusId) {
        const syllabus = await this.prisma.courseSyllabus.findUnique({
            where: { id: syllabusId },
        });
        if (!syllabus || syllabus.courseId !== courseId) {
            throw new NotFoundException('Syllabus topilmadi');
        }
        await this.prisma.courseSyllabus.delete({ where: { id: syllabusId } });
        return { message: "Syllabus o'chirildi" };
    }
};
CoursesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CoursesService);
export { CoursesService };
//# sourceMappingURL=courses.service.js.map