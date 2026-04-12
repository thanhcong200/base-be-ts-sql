import { BaseColumn } from '@configuration/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('lock')
export class Lock extends BaseColumn {
  @Column({ unique: true, nullable: false })
  public key: string;

  @Column({ nullable: false, type: 'bigint' })
  public expire_time: number; // miliseconds
}
