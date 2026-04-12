import { Injectable, Optional } from '@nestjs/common';
import { SettingsService } from '@modules/settings/settings.service';

import { DataSource, EntityManager, In } from 'typeorm';

import { LockRepository } from './repository/lock.repository';
import { CreateLockDto } from './dto/create-lock.dto';
import { Lock } from '@modules/databases/lock.entity';
const BigNumber = require('bignumber.js');

@Injectable()
export class CommonServiceService {
  constructor(
    private readonly connection: DataSource,
    private readonly settingService: SettingsService,
    @Optional()
    private readonly lockRepository: LockRepository,
  ) { }

  async withLock(data: CreateLockDto, transaction: EntityManager, fn: Function) {
    const { keys, expire_time } = data;
    try {
      const locks = keys.map((key) => this.lockRepository.create({ key, expire_time }));
      await transaction.save(locks);
      await fn();
    } catch (err) {
      console.log(err);
    }
    await transaction
      .createQueryBuilder()
      .delete()
      .from(Lock)
      .where({ key: In(keys) })
      .execute();
  }

  createLock(data: CreateLockDto) {
    return this.lockRepository.create(data);
  }

  async deleteLocksByKeys(keys: string[]) {
    await this.lockRepository.delete({ key: In(keys) });
  }

}
