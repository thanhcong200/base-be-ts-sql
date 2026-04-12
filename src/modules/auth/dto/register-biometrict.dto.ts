import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { TrimSpace } from '@common/decorators/transforms.decorator';
import { BIOMETRICT_TYPE } from '@common/enums';
import { MAX_STR_LENGTH, MIN_STR_LENGTH } from '@constant/validation';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PasswordDto } from './username.dto';

export class BiometrictTypeDto {
  @ApiProperty({
    enum: BIOMETRICT_TYPE,
    required: false,
    default: BIOMETRICT_TYPE.FINGERPRINT,
  })
  @IsNotEmpty()
  @IsEnum(BIOMETRICT_TYPE)
  type: BIOMETRICT_TYPE;
}

export class BiometrictIdDto {
  @ApiProperty({ required: true, example: 'id' })
  @IsNotEmpty()
  @TrimSpace()
  @IsString()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_STR_LENGTH)
  id: string;
}
export class RegisterBiometrictDto extends IntersectionType(BiometrictTypeDto, PasswordDto) {}
