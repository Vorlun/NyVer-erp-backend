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
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateLessonMaterialDto {
    title;
    fileUrl;
    fileType;
    sizeMb;
}
__decorate([
    ApiProperty({ description: 'Material sarlavhasi' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonMaterialDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ description: 'Fayl URL manzili' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonMaterialDto.prototype, "fileUrl", void 0);
__decorate([
    ApiProperty({ description: 'Fayl turi (pdf, video, docs)', required: false }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateLessonMaterialDto.prototype, "fileType", void 0);
__decorate([
    ApiProperty({ description: 'Fayl hajmi (MB)', required: false }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateLessonMaterialDto.prototype, "sizeMb", void 0);
export class UpdateLessonMaterialDto extends PartialType(CreateLessonMaterialDto) {
}
//# sourceMappingURL=lesson-material.dto.js.map