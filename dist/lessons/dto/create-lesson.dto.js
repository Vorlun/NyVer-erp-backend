var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';
export class CreateLessonDto {
    lessonOrder;
    topic;
    description;
    videoUrl;
    content;
    lessonDate;
    startTime;
    endTime;
    groupId;
    teacherId;
    roomId;
}
__decorate([
    ApiProperty({ description: 'Dars raqami (tartib)', example: 1 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "lessonOrder", void 0);
__decorate([
    ApiProperty({ description: 'Dars mavzusi', example: 'HTML5 Semantic' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "topic", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Video darslik havolasi (YouTube, Vimeo, mp4)', example: 'https://youtube.com/watch?v=xyz' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars matni va batafsil mazmuni' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "content", void 0);
__decorate([
    ApiProperty({ description: 'Dars sanasi', example: '2026-02-02' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "lessonDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Boshlanish vaqti', example: '14:00' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tugash vaqti', example: '16:00' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "endTime", void 0);
__decorate([
    ApiProperty({ description: 'Guruh ID', example: 1 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "groupId", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi ID" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "teacherId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Xona ID' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "roomId", void 0);
export class UpdateLessonDto {
    topic;
    description;
    videoUrl;
    content;
    lessonDate;
    startTime;
    endTime;
    teacherId;
    roomId;
    status;
}
__decorate([
    ApiPropertyOptional({ description: 'Dars mavzusi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "topic", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tavsif' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Video darslik havolasi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars matni va batafsil mazmuni' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars sanasi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "lessonDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Boshlanish vaqti' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tugash vaqti' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi ID" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdateLessonDto.prototype, "teacherId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Xona ID' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], UpdateLessonDto.prototype, "roomId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Status', enum: Status }),
    IsOptional(),
    IsEnum(Status),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "status", void 0);
export class QueryLessonDto {
    groupId;
    teacherId;
    dateFrom;
    dateTo;
}
__decorate([
    ApiPropertyOptional({ description: "Guruh ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryLessonDto.prototype, "groupId", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryLessonDto.prototype, "teacherId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sana (dan)', example: '2026-02-01' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryLessonDto.prototype, "dateFrom", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sana (gacha)', example: '2026-02-28' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], QueryLessonDto.prototype, "dateTo", void 0);
//# sourceMappingURL=create-lesson.dto.js.map