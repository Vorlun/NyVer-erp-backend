var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsEnum, IsOptional, IsString, IsArray, ValidateNested, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AttendanceStatus } from '@prisma/client';
export class AttendanceRecordDto {
    studentId;
    status;
    coinsEarned;
    note;
}
__decorate([
    ApiProperty({ description: 'Talaba ID', example: 5 }),
    IsInt(),
    Type(() => Number),
    __metadata("design:type", Number)
], AttendanceRecordDto.prototype, "studentId", void 0);
__decorate([
    ApiProperty({
        description: 'Davomat statusi',
        enum: AttendanceStatus,
        example: 'PRESENT',
    }),
    IsEnum(AttendanceStatus),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Mukofot tanga', default: 0 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], AttendanceRecordDto.prototype, "coinsEarned", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Izoh' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "note", void 0);
export class BulkAttendanceDto {
    lessonId;
    records;
}
__decorate([
    ApiProperty({ description: 'Dars ID', example: 1 }),
    IsInt(),
    Type(() => Number),
    __metadata("design:type", Number)
], BulkAttendanceDto.prototype, "lessonId", void 0);
__decorate([
    ApiProperty({
        description: 'Davomat yozuvlari',
        type: [AttendanceRecordDto],
    }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => AttendanceRecordDto),
    __metadata("design:type", Array)
], BulkAttendanceDto.prototype, "records", void 0);
export class QueryAttendanceDto {
    lessonId;
    studentId;
    groupId;
}
__decorate([
    ApiPropertyOptional({ description: "Dars ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryAttendanceDto.prototype, "lessonId", void 0);
__decorate([
    ApiPropertyOptional({ description: "Talaba ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryAttendanceDto.prototype, "studentId", void 0);
__decorate([
    ApiPropertyOptional({ description: "Guruh ID bo'yicha" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    __metadata("design:type", Number)
], QueryAttendanceDto.prototype, "groupId", void 0);
//# sourceMappingURL=mark-attendance.dto.js.map