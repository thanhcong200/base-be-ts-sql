import { Trim } from '@common/decorators/transforms.decorator';
import { MAX_STR_LENGTH, MAX_TEXT_LENGTH, MIN_STR_LENGTH } from '@constant/index';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_STR_LENGTH)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(MIN_STR_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH)
  description: string;

  @IsNotEmpty({ each: true })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  public screen: number[];

  @IsOptional({ each: true })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  public sub_screen: number[];

  @IsOptional({ each: true })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  public permission: number[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly allow_duplicate_area: boolean;
}
