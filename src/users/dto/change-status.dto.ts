import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Yangi status',
    enum: Status,
    example: 'ACTIVE',
  })
  @IsEnum(Status, { message: "Noto'g'ri status qiymati" })
  status: Status;
}
