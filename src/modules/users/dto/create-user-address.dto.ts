import { EmailDto } from '@common/dto/common.dto';
import {
  AddressTypeDto,
  CountryDto,
  FirstnameDto,
  LastnameDto,
  PhoneCodeDto,
  PhoneDto,
  StateDto,
  TownCityDto,
  ZipCodeDto,
} from '@modules/auth/dto';
import { DELIVERY_TYPE } from '@modules/databases/order.entity';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserAddressDto extends IntersectionType(
  FirstnameDto,
  LastnameDto,
  PhoneCodeDto,
  PhoneDto,
  EmailDto,
  StateDto,
  CountryDto,
  ZipCodeDto,
  TownCityDto,
  AddressTypeDto,
) {
  @ApiProperty({ description: 'address line ' })
  @IsString()
  @IsNotEmpty()
  public address_line_1: string;

  @ApiProperty({ description: 'notes' })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty({ description: 'Delivery type' })
  @IsOptional()
  @IsEnum(DELIVERY_TYPE)
  delivery_type?: DELIVERY_TYPE;
}
export class CreateUserAddressDto extends IntersectionType(UpdateUserAddressDto) {
  @ApiProperty({ description: 'is save ' })
  @IsBoolean()
  @IsOptional()
  public is_save: boolean = false;
}
