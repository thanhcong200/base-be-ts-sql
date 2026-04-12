import { BaseSearchDto } from '@common/dto/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchUserAddressDto extends BaseSearchDto {
  @ApiProperty({ description: 'User Id', required: false })
  @IsOptional()
  @IsNumber()
  user_id: number;
}
