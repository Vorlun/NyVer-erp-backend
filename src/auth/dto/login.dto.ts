import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Telefon raqami yoki Email',
    example: 'one.humoyun@gmail.com',
  })
  @IsNotEmpty({ message: 'Login (telefon yoki email) kiritish majburiy' })
  @IsString({ message: "Login matn ko'rinishida bo'lishi kerak" })
  login: string;

  @ApiProperty({ description: 'Parol', example: 'Kuchli@Parol99' })
  @IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak" })
  @IsString({ message: "Parol matn ko'rinishida bo'lishi kerak" })
  @MinLength(4, { message: "Parol kamida 4 ta belgidan iborat bo'lishi kerak" })
  password: string;
}
