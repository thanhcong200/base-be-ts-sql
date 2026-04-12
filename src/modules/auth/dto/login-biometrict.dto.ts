import { ApiHideProperty, IntersectionType } from '@nestjs/swagger';
import { BiometrictIdDto } from './register-biometrict.dto';

export class LoginBiometrictDto extends IntersectionType(BiometrictIdDto) {
  @ApiHideProperty()
  device_hash: string;
}
