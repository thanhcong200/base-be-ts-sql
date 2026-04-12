import { Trim, TrimSpace } from '@common/decorators';
import { USER_CLIENT } from '@common/enums';
import { EMAIL_INVALID, TAX_CODE_INVALID } from '@constant/error-messages';
import { MAX_STR_LENGTH, MAX_TEXT_LENGTH, MIN_STR_LENGTH, REGEX_EMAIL } from '@constant/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ParentRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform((u) => u.value || undefined)
  readonly parent_id: number;
}
export class ParentRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform((u) => u.value || undefined)
  readonly parent_id: number;
}

export class ProvinceRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly province_id: number;
}

export class ProvinceRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly province_id: number;
}

export class DistrictRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly district_id: number;
}

export class DistrictRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly district_id: number;
}

export class WardRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly ward_id: number;
}

export class WardRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly ward_id: number;
}

export class IdRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly id: number;
}

export class IdRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly id: number;
}

export class UuidRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => String)
  @IsUUID()
  @Transform((u) => u.value || undefined)
  readonly id: string;
}
export class UuidRefOptionalDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @Type(() => String)
  @IsUUID()
  @Transform((u) => u.value || undefined)
  id: string;
}

export class RoleRefDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  role_id: number;
}
export class RoleRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform((u) => u.value || undefined)
  readonly role_id: number;
}

export class ImageDto {
  @ApiProperty({ required: false })
  @TrimSpace()
  @IsString()
  @IsOptional()
  @Transform((u) => u.value || undefined)
  image: string;
}

export class ImageOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH)
  image?: string;
}

export class SearchDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly search?: string;
}

export class UserRefDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly user_id: number;
}
export class UserRefOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform((u) => u.value || undefined)
  readonly user_id: number;
}

export class ClientDto {
  @ApiProperty({ required: true, enum: USER_CLIENT })
  @IsEnum(USER_CLIENT)
  @IsNotEmpty()
  @IsIn([USER_CLIENT.USER, USER_CLIENT.TECHNICIAN])
  client: USER_CLIENT;
}

export class ClientOptionalDto {
  @ApiProperty({ required: false, enum: USER_CLIENT })
  @IsEnum(USER_CLIENT)
  @IsOptional()
  @IsIn([USER_CLIENT.USER, USER_CLIENT.TECHNICIAN])
  client: USER_CLIENT;
}

export class TaxCodeDto {
  @ApiProperty({ required: true, example: '0987654321' })
  @IsNotEmpty()
  @TrimSpace()
  @IsString()
  @IsNumberString()
  @MinLength(1, { message: TAX_CODE_INVALID })
  @MaxLength(13, { message: TAX_CODE_INVALID })
  tax_code: string;
}
export class TaxCodeOptionalDto {
  @ApiProperty({ required: false, example: '0987654321' })
  @TrimSpace()
  @IsString()
  @IsNumberString()
  @MaxLength(13, { message: TAX_CODE_INVALID })
  @MinLength(1, { message: TAX_CODE_INVALID })
  @IsOptional()
  tax_code?: string;
}
export class NameDto {
  @ApiProperty({ required: true })
  @IsString()
  @Trim()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_STR_LENGTH)
  @IsNotEmpty()
  name: string;
}

export class DesciptionOptionalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH)
  description: string;
}

export class EmailDto {
  @ApiProperty({ required: true, description: 'email', example: 'ducnd@gmail.com' })
  @IsEmail()
  @Matches(RegExp(REGEX_EMAIL, 'g'), { message: EMAIL_INVALID })
  @TrimSpace()
  @IsNotEmpty()
  email: string;
}

export class EmailOptionalDto {
  @ApiProperty({ required: true, description: 'email', example: 'ducnd@gmail.com' })
  @IsEmail()
  @Matches(RegExp(REGEX_EMAIL, 'g'), { message: EMAIL_INVALID })
  @TrimSpace()
  @IsOptional()
  email: string;
}

export class DeviceHashDto {
  @ApiProperty({ required: true })
  @IsString()
  @Trim()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH)
  @IsNotEmpty()
  device_hash: string;
}

export class BaseSearchDto {
  @ApiProperty({ required: false })
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Trim()
  @Transform((u) => (u.value ? u.value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '') : u.value))
  @MaxLength(250)
  keyword?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  sort: object = { created_at: 'DESC' };
}
