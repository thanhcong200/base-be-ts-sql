import { StaticType } from '@modules/databases/static.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class StaticDto {
  @ApiProperty({ description: 'Key static page' })
  @IsEnum(StaticType)
  @IsNotEmpty()
  type: StaticType;
}
