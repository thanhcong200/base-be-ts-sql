import { Injectable } from '@nestjs/common';
import { SettingRepository } from './repository/setting.repository';
import { SettingType } from 'aws-sdk/clients/ecs';

@Injectable()
export class SettingsService {
  constructor(private readonly settingRepository: SettingRepository) {}
  getValueByKey(key: SettingType) {
    return this.settingRepository.findOneBy({ key });
  }


}
