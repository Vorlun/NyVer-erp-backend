import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordDto {
  @ApiProperty({ example: 'eyJhbGci...' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'MyStr0ngP@ss' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
