import { BaseSearchDto } from '@common/dto/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchingUserDto extends BaseSearchDto {
  @ApiProperty({ required: false, default: null })
  @Type(() => String)
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({ required: false, default: null })
  @Type(() => String)
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({ required: false, default: null })
  @IsDateString()
  @IsOptional()
  from_date: string;

  @ApiProperty({ required: false, default: null })
  @IsDateString()
  @IsOptional()
  to_date: string;
}
