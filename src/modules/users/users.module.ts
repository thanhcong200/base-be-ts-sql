import { AuthModule } from '@modules/auth/auth.module';

import { MailServiceModule } from '@modules/mail-service/mail-service.module';

import { RoleRepository } from '@modules/role/repository/role.repository';
import { StoragesModule } from '@modules/storages/storages.module';

import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsModule } from '@modules/notifications/notifications.module';

import { Users } from '../databases/user.entity';
import { UserRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserAddressRepository } from './repository/users-address.repository';
import { UserAddress } from '@modules/databases/user-address.entity';
import { Admins } from '@modules/databases/admin.entity';
import { AdminRepository } from '@modules/admins/repository/admin.repository';
import { UsersManagementController } from './users-management.controller';
import { UserDeviceModule } from '@modules/user-device/user-device.module';
import { OrderRepository } from '@modules/orders/repository/order.repository';
import { TokenRepository } from '@modules/token/repository/token.repository';
import { PaymentsModule } from '@modules/payments/payment.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserAddress, Admins]),
    AuthModule,
    forwardRef(() => NotificationsModule),
    StoragesModule,
    MailServiceModule,
    UserDeviceModule,
    PaymentsModule,
  ],
  controllers: [UsersController, UsersManagementController],
  providers: [
    UsersService,
    UserRepository,
    RoleRepository,
    UserAddressRepository,
    AdminRepository,
    OrderRepository,
    TokenRepository,
  ],
  exports: [UsersService, UserRepository, UserAddressRepository],
})
export class UsersModule {}
