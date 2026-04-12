import { StatusDto } from '@common/dto';
import { IntersectionType } from '@nestjs/swagger';
import { BiometrictIdDto } from './register-biometrict.dto';

export class ChangeStatusBiometrictDto extends IntersectionType(StatusDto, BiometrictIdDto) {}
