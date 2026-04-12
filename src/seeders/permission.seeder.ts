import { Permission } from '@modules/databases/permission.entity';
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(private connection: DataSource) {}

  private dataRef: number[] = [];
  async seed(): Promise<any> {
    return !0;
  }

  async drop(): Promise<any> {
    await this.connection
      .createQueryBuilder()
      .delete()
      .from(Permission)
      .where('"id" IN (:...ids)', { ids: this.dataRef })
      .execute();
  }
}
