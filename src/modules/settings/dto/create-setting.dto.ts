import { SettingType } from '@modules/databases/setting.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsEnum(SettingType)
  key: SettingType;

  @IsNotEmpty()
  value: object;
}
