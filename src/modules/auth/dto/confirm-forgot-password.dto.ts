import { IntersectionType } from '@nestjs/swagger';
import { TokenDto } from './refresh-token.dto';
import { ConfirmPasswordDto, PasswordDto } from './username.dto';

export class RecoverPasswordDto extends IntersectionType(PasswordDto, ConfirmPasswordDto, TokenDto) {}
