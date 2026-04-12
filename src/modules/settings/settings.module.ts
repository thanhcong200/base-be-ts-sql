import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from '@modules/databases/setting.entity';
import { SettingRepository } from './repository/setting.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService, SettingRepository],
  exports: [SettingsService, SettingRepository],
})
export class SettingsModule {}
