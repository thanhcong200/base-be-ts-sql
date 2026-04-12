import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { TrimSpace } from '@common/decorators/transforms.decorator';
import { MIN_STR_LENGTH } from '@constant/validation';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceDto {
  @ApiProperty({ required: true })
  @IsString()
  @TrimSpace()
  @MinLength(MIN_STR_LENGTH)
  @IsNotEmpty()
  subscription: string;
}
