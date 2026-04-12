import { STATUS, TOKEN_TYPE, USER_CLIENT } from '@common/enums';
import { BaseUuidColumn } from '@configuration/base-entity';
import { Users } from '@modules/databases/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Admins } from './admin.entity';

@Entity()
export class Token extends BaseUuidColumn {
  @Column({ nullable: true })
  public user_id: number;
  @ManyToOne(() => Users, (u) => u.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user: Users;

  @Column({ nullable: true })
  public admin_id: number;
  @ManyToOne(() => Admins, (u) => u.id, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  public admin: Admins;

  @Column({ enum: USER_CLIENT, default: USER_CLIENT.USER })
  public client: string;

  @Column({ nullable: true })
  public access_token: string;

  @Column({ nullable: true })
  public refresh_token: string;

  @Column({ default: TOKEN_TYPE.LOGIN })
  public type: TOKEN_TYPE;

  @Column({ nullable: true })
  public expired_at: Date;

  @Column({ default: STATUS.ACTIVE })
  public status: STATUS;

  @Column({ nullable: true })
  public device_id: string;
}
