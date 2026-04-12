import { STATUS } from '@common/enums';
import { BaseSoftDeleteEntity } from '@configuration/base-entity';
import { Permission } from '@modules/databases/permission.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
export const ROLE_PERMISSION = 'roles_permissions';

@Entity()
export class Role extends BaseSoftDeleteEntity {
  @Column()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable({
    name: ROLE_PERMISSION,
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @Column({ default: STATUS.ACTIVE })
  public status: STATUS;
}
