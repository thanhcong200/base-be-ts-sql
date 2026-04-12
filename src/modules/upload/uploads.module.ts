import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { GoogleCloudService } from '../../service/google-cloud.service';
import { AuthModule } from '@modules/auth/auth.module';
import { AdminRepository } from '@modules/admins/repository/admin.repository';

@Module({
  imports: [AuthModule],
  controllers: [UploadsController],
  providers: [UploadsService, GoogleCloudService, AdminRepository],
})
export class UploadsModule {}
