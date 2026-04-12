import { BaseRepository } from '@common/repository/base-repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Settings } from '@modules/databases/setting.entity';

@Injectable()
export class SettingRepository extends BaseRepository<Settings> {
  constructor(private dataSource: DataSource) {
    super(Settings, dataSource);
  }
}
