import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SocialAuthDataDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  google_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  facebook_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  twitter_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  apple_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  domain?: string;

  @ApiProperty({ required: false })
  @IsString()
  device_hash?: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  is_mobile: boolean;
}
