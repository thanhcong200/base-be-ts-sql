import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsEmail, MaxLength, MinLength } from 'class-validator';

// configs
export const USPS_ORDER_ADDRESS_MAX_LENGTH = 50;
export const FEDEX_ORDER_ADDRESS_MAX_LENGTH = 35;
export const ORDER_ADDRESS_FIRST_NAME_MAX_LENGTH = 34;
export const ORDER_ADDRESS_LAST_NAME_MAX_LENGTH = 34;
export const ORDER_ADDRESS_EMAIL_MAX_LENGTH = 50;
export const ORDER_ADDRESS_CITY_MAX_LENGTH = 28;
export const ORDER_ADDRESS_STATE_CODE_MAX_LENGTH = 2;
export const ORDER_ADDRESS_COUNTRY_CODE_MAX_LENGTH = 2;
export const ORDER_ADDRESS_ZIP_CODE_MAX_LENGTH = 5;
export const ORDER_ADDRESS_PHONE_NUMBER_LENGTH = 10;

export class VerifyOrderAddressDto {
  @ApiProperty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  street_addresses: string[];

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_FIRST_NAME_MAX_LENGTH)
  first_name: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_LAST_NAME_MAX_LENGTH)
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_EMAIL_MAX_LENGTH)
  email: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_CITY_MAX_LENGTH)
  city: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_STATE_CODE_MAX_LENGTH)
  state_code: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_COUNTRY_CODE_MAX_LENGTH)
  country_code: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(ORDER_ADDRESS_ZIP_CODE_MAX_LENGTH)
  zip_code: string;

  @ApiProperty()
  @MinLength(ORDER_ADDRESS_PHONE_NUMBER_LENGTH)
  @MaxLength(ORDER_ADDRESS_PHONE_NUMBER_LENGTH)
  phone_number: string;
}
