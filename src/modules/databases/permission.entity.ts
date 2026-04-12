import { BaseSoftDeleteEntity } from '@configuration/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Permission extends BaseSoftDeleteEntity {
  @Column({ nullable: false })
  name: string;
  /**
   * synctax model_feature
   */
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  method: string;

  @Column({ nullable: false })
  action: string;

}
