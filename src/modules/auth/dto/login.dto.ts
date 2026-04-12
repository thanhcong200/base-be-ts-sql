import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonUsernameDto, EmailDto, PasswordDto, RememberMeDto } from './username.dto';
export class UserLoginDto extends IntersectionType(EmailDto, PasswordDto, RememberMeDto) {}
export class AdminLoginDto extends UserLoginDto {}

export class LoginDto extends IntersectionType(PasswordDto, RememberMeDto, EmailDto) {}
export class CheckAccountAuthDto extends CommonUsernameDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
