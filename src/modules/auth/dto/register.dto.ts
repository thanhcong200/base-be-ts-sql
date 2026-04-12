import { IntersectionType } from '@nestjs/swagger';
import {
  CountryDto,
  DateOfBirthDto,
  EmailDto,
  FirstnameDto,
  GenderDto,
  LastnameDto,
  PasswordDto,
  PhoneDto,
} from './username.dto';

export class UserRegisterDto extends IntersectionType(
  PasswordDto,
  EmailDto,
  PhoneDto,
  CountryDto,
  GenderDto,
  FirstnameDto,
  LastnameDto,
  DateOfBirthDto,
) { }
