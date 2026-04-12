import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token } from '../databases/token.entity';

import { TokenRepository } from './repository/token.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokenModule {}
