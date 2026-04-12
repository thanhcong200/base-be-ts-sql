import { Role } from '@modules/databases/role.entity';

import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(private connection: DataSource) {}

  private dataRef: number[] = [];
  async seed(): Promise<any> {
    console.log('seed');
  }

  async drop(): Promise<any> {
    await this.connection
      .createQueryBuilder()
      .delete()
      .from(Role)
      .where('"id" IN (:...ids)', { ids: this.dataRef })
      .execute();
  }
}
