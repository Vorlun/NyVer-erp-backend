import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty({ message: "Refresh token bo'sh bo'lmasligi kerak" })
  @IsString()
  refreshToken: string;
}
