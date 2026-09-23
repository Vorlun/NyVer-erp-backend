var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsArray, IsBoolean, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupStatus, WeekDay } from '@prisma/client';
export class CreateGroupDto {
    name;
    startDate;
    endDate;
    startTime;
    endTime;
    maxStudents;
    weekDays;
    courseId;
    roomId;
    teacherId;
}
__decorate([
    ApiProperty({ description: 'Guruh nomi', example: 'FE-201' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: 'Boshlanish sanasi', example: '2026-02-01' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tugash sanasi', example: '2026-06-01' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "endDate", void 0);
__decorate([
    ApiProperty({ description: 'Dars boshlanish vaqti', example: '14:00' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "startTime", void 0);
__decorate([
    ApiProperty({ description: 'Dars tugash vaqti', example: '16:00' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maksimal talabalar soni', default: 15 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "maxStudents", void 0);
__decorate([
    ApiProperty({
        description: 'Dars kunlari',
        example: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
        enum: WeekDay,
        isArray: true,
    }),
    IsArray(),
    IsEnum(WeekDay, { each: true }),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "weekDays", void 0);
__decorate([
    ApiProperty({ description: 'Kurs ID', example: 1 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "courseId", void 0);
__decorate([
    ApiProperty({ description: 'Xona ID', example: 1 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "roomId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Ustoz ID', example: 19 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "teacherId", void 0);
export class UpdateGroupDto {
    name;
    startDate;
    endDate;
    startTime;
    endTime;
    maxStudents;
    weekDays;
    status;
    roomId;
    courseId;
    teacherId;
}
__decorate([
    ApiPropertyOptional({ description: 'Guruh nomi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Boshlanish sanasi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tugash sanasi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars boshlanish vaqti' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars tugash vaqti' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maksimal talabalar soni' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "maxStudents", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Dars kunlari',
        enum: WeekDay,
        isArray: true,
    }),
    IsOptional(),
    IsArray(),
    IsEnum(WeekDay, { each: true }),
    __metadata("design:type", Array)
], UpdateGroupDto.prototype, "weekDays", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Status', enum: GroupStatus }),
    IsOptional(),
    IsEnum(GroupStatus),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Xona ID' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "roomId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Kurs ID' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "courseId", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi (Mentor) ID" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "teacherId", void 0);
export class QueryGroupDto {
    courseId;
    status;
    teacherId;
}
__decorate([
    ApiPropertyOptional({ description: "Kurs ID bo'yicha filtrlash" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryGroupDto.prototype, "courseId", void 0);
__decorate([
    ApiPropertyOptional({ description: "Status bo'yicha", enum: GroupStatus }),
    IsOptional(),
    IsEnum(GroupStatus),
    __metadata("design:type", String)
], QueryGroupDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryGroupDto.prototype, "teacherId", void 0);
export class AddStudentDto {
    studentId;
}
__decorate([
    ApiProperty({ description: 'Talaba ID', example: 5 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], AddStudentDto.prototype, "studentId", void 0);
export class AddTeacherDto {
    teacherId;
    isMain;
}
__decorate([
    ApiProperty({ description: "O'qituvchi ID", example: 3 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], AddTeacherDto.prototype, "teacherId", void 0);
__decorate([
    ApiPropertyOptional({ description: "Asosiy o'qituvchimi?", default: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], AddTeacherDto.prototype, "isMain", void 0);
//# sourceMappingURL=create-group.dto.js.map