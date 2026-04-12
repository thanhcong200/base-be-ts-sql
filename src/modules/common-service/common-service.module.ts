import { Module, forwardRef } from '@nestjs/common';
import { CommonServiceService } from './common-service.service';
import { CommonServiceController } from './common-service.controller';
import { SettingsModule } from '@modules/settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '@modules/admins/repository/admin.repository';
import { UserRepository } from '@modules/users/repository/users.repository';
import { Lock } from '@modules/databases/lock.entity';
import { LockRepository } from './repository/lock.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lock]),
    SettingsModule,
  ],
  controllers: [CommonServiceController],
  providers: [
    CommonServiceService,
    AdminRepository,
    UserRepository,
    LockRepository,
  ],
  exports: [CommonServiceService],
})
export class CommonServiceModule { }
