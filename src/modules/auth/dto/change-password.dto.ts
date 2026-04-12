import { IntersectionType } from '@nestjs/swagger';
import {
  AdminConfirmPasswordDto,
  AdminOldPasswordDto,
  AdminPasswordDto,
  ConfirmPasswordDto,
  OldPasswordDto,
  PasswordDto,
} from './username.dto';

export class ChangePasswordDto extends IntersectionType(PasswordDto, ConfirmPasswordDto, OldPasswordDto) {}
export class UserChangePasswordDto extends IntersectionType(ChangePasswordDto) {}
export class AdminChangePasswordDto extends IntersectionType(
  AdminPasswordDto,
  AdminConfirmPasswordDto,
  AdminOldPasswordDto,
) {}
