import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OtpDto {
  @ApiProperty({ description: 'otp' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
