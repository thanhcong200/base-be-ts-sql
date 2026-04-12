import { BaseColumn } from '@configuration/base-entity';

import { Column, Entity } from 'typeorm';

export enum SettingType {
  LIST_COUNTRIES = 'list_country',
  FIRMWARE_VERSION = 'firmware_version',
}
@Entity()
export class Settings extends BaseColumn {
  @Column({ nullable: false })
  key: string;

  @Column('json', { nullable: false })
  value: string;
}
