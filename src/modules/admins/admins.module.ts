import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from '@modules/databases/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository],
  exports: [AdminRepository],
})
export class AdminsModule {}
