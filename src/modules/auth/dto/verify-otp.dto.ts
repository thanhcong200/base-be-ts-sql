import { IntersectionType } from '@nestjs/swagger';
import { EmailDto } from './username.dto';
import { OtpDto } from '@modules/common-service/dto/otp.dto';

export class VerifyOtpDto extends IntersectionType(OtpDto, EmailDto) {}
