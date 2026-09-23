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
export class CreateRoomDto {
    name;
    capacity;
}
__decorate([
    ApiProperty({ description: 'Xona nomi', example: 'Xona #101' }),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: "Sig'imi (o'rinlar soni)", example: 16 }),
    IsNotEmpty(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "capacity", void 0);
export class UpdateRoomDto {
    name;
    capacity;
    status;
}
__decorate([
    ApiPropertyOptional({ description: 'Xona nomi' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateRoomDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ description: "Sig'imi" }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateRoomDto.prototype, "capacity", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Status', enum: Status }),
    IsOptional(),
    IsEnum(Status),
    __metadata("design:type", String)
], UpdateRoomDto.prototype, "status", void 0);
//# sourceMappingURL=create-room.dto.js.map