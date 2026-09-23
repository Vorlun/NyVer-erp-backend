var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, } from 'class-validator';
export class CreateExamDto {
    title;
    examDate;
    maxScore;
    groupId;
}
__decorate([
    ApiProperty({ description: 'Imtihon sarlavhasi' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateExamDto.prototype, "title", void 0);
__decorate([
    ApiProperty({
        description: 'Imtihon sanasi',
        example: '2023-12-01T10:00:00Z',
    }),
    IsNotEmpty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateExamDto.prototype, "examDate", void 0);
__decorate([
    ApiProperty({ description: 'Maksimal ball', default: 100 }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "maxScore", void 0);
__decorate([
    ApiProperty({ description: 'Guruh ID' }),
    IsNotEmpty(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "groupId", void 0);
export class UpdateExamDto extends PartialType(CreateExamDto) {
}
export class ExamResultDto {
    studentId;
    score;
}
__decorate([
    ApiProperty({ description: 'Talaba ID' }),
    IsNotEmpty(),
    IsNumber(),
    __metadata("design:type", Number)
], ExamResultDto.prototype, "studentId", void 0);
__decorate([
    ApiProperty({ description: "To'plagan bali" }),
    IsNotEmpty(),
    IsNumber(),
    __metadata("design:type", Number)
], ExamResultDto.prototype, "score", void 0);
//# sourceMappingURL=create-exam.dto.js.map