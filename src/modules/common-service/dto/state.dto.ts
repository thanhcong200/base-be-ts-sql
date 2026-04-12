import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StateDto {
  @ApiProperty({ description: 'Get states by country code' })
  @IsNotEmpty()
  @IsString()
  country_code: string;
}
