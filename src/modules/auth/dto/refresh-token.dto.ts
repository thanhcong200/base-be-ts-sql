import { TrimSpace } from '@common/decorators/transforms.decorator';
import { MIN_STR_LENGTH } from '@constant/validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'refresh_token' })
  @IsString()
  @TrimSpace()
  @IsNotEmpty()
  @MinLength(MIN_STR_LENGTH)
  refresh_token: string;
}

export class TokenDto {
  @ApiProperty({ description: 'token' })
  @IsString()
  @TrimSpace()
  @IsNotEmpty()
  @MinLength(MIN_STR_LENGTH)
  token: string;
}
