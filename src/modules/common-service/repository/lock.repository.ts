import { BaseRepository } from '@common/repository/base-repository';
import { Lock } from '@modules/databases/lock.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class LockRepository extends BaseRepository<Lock> {
  constructor(private dataSource: DataSource) {
    super(Lock, dataSource);
  }
}
