import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GuestIdDto {
  @ApiProperty({ description: 'Guest Id' })
  @IsNotEmpty()
  @IsString()
  guest_id: string;
}
