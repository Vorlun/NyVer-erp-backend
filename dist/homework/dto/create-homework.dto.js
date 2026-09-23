var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, IsDateString, Min, Max, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateHomeworkDto {
    title;
    task;
    fileUrls;
    maxScore;
    maxCoins;
    deadline;
    lessonId;
}
__decorate([
    ApiProperty({ description: 'Vazifa sarlavhasi', example: 'Vue 3 Todo App' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateHomeworkDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ description: 'Vazifa matni' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateHomeworkDto.prototype, "task", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Fayl URL lari', type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateHomeworkDto.prototype, "fileUrls", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maksimal ball', default: 100 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateHomeworkDto.prototype, "maxScore", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maksimal tanga (coin)', default: 10 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateHomeworkDto.prototype, "maxCoins", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Muddat (deadline)' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateHomeworkDto.prototype, "deadline", void 0);
__decorate([
    ApiProperty({ description: 'Dars ID', example: 3 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], CreateHomeworkDto.prototype, "lessonId", void 0);
export class SubmitHomeworkDto {
    textAnswer;
    fileUrls;
}
__decorate([
    ApiPropertyOptional({ description: 'Matnli javob' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SubmitHomeworkDto.prototype, "textAnswer", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Fayl URL lari', type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], SubmitHomeworkDto.prototype, "fileUrls", void 0);
export class CheckSubmissionDto {
    score;
    coinsEarned;
    feedback;
}
__decorate([
    ApiProperty({ description: 'Ball (0 dan maxScore gacha)', example: 85 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], CheckSubmissionDto.prototype, "score", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Mukofot tangalar', default: 0 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CheckSubmissionDto.prototype, "coinsEarned", void 0);
__decorate([
    ApiPropertyOptional({ description: "O'qituvchi izohi (feedback)" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CheckSubmissionDto.prototype, "feedback", void 0);
//# sourceMappingURL=create-homework.dto.js.map