import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Yangi parol (kamida 6 belgi)',
    example: 'newpass123',
  })
  @IsNotEmpty({ message: "Yangi parol bo'sh bo'lmasligi kerak" })
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  newPassword: string;
}
