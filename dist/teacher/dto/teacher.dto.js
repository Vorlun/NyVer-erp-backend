var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, IsDateString, Min, Max, IsIn, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateLessonTeacherDto {
    topic;
    videoUrl;
    content;
    attachedFiles;
    homeworkTask;
    lessonOrder;
    lessonDate;
    startTime;
    endTime;
}
__decorate([
    ApiProperty({ description: 'Dars mavzusi', example: '1-Dars: HTML & CSS asoslari' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "topic", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Video darslik havolasi (YouTube / havola)', example: 'https://youtu.be/...' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "videoUrl", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars matni va ko\'rsatmalar' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Biriktirilgan fayllar ro\'yxati', type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateLessonTeacherDto.prototype, "attachedFiles", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Uy vazifasi sharti / topshiriq', example: 'Flexbox yordamida responsive layout yarating' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "homeworkTask", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars tartib raqami' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateLessonTeacherDto.prototype, "lessonOrder", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars o\'tiladigan sana (YYYY-MM-DD)' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "lessonDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Boshlanish vaqti', example: '14:00' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tugash vaqti', example: '16:00' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonTeacherDto.prototype, "endTime", void 0);
export class GradeSubmissionDto {
    score;
    feedback;
    coinsEarned;
    status;
}
__decorate([
    ApiProperty({ description: 'Baholash bali (0 - 100)', example: 95 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], GradeSubmissionDto.prototype, "score", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Mentor izohi (feedback)', example: 'Barakalla, kod juda toza!' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "feedback", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rag\'batlantiruvchi tangalar soni', example: 10 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], GradeSubmissionDto.prototype, "coinsEarned", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Holati', enum: ['CHECKED', 'ACCEPTED', 'REJECTED'] }),
    IsOptional(),
    IsIn(['CHECKED', 'ACCEPTED', 'REJECTED']),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "status", void 0);
export class CreateTeacherHomeworkDto {
    title;
    task;
    lessonId;
    maxScore;
    maxCoins;
    deadline;
    fileUrls;
}
__decorate([
    ApiProperty({ description: 'Vazifa mavzusi / sarlavhasi', example: 'Flexbox va Grid layout topshirig\'i' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateTeacherHomeworkDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ description: 'Vazifa sharti va talablari', example: 'Flexbox orqali navbar va hero qismini quring' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateTeacherHomeworkDto.prototype, "task", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Dars ID (agar mavjud darsga biriktirilsa)' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateTeacherHomeworkDto.prototype, "lessonId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maksimal ball', default: 100 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateTeacherHomeworkDto.prototype, "maxScore", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Tanga mukofoti (Coins)', default: 10 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateTeacherHomeworkDto.prototype, "maxCoins", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Topshirish muddati (deadline)' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateTeacherHomeworkDto.prototype, "deadline", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Biriktirilgan fayllar', type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateTeacherHomeworkDto.prototype, "fileUrls", void 0);
//# sourceMappingURL=teacher.dto.js.map