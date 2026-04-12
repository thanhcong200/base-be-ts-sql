import { PermissionRepository } from '@modules/permission/repository/permission.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../databases/role.entity';
import { RoleRepository } from './repository/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AdminRepository } from '@modules/admins/repository/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PermissionRepository, AdminRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
