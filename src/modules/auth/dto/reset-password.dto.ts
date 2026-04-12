import { IntersectionType } from '@nestjs/swagger';
import { IdDto } from './id.dto';
import { ConfirmPasswordDto, PasswordDto } from './username.dto';

export class ResetPasswordDto extends IntersectionType(PasswordDto, ConfirmPasswordDto, IdDto) {}
