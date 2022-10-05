import { UsersModule } from './../../users/users.module';
import { AuthModule } from './../auth.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoinbaseController } from './coinbase.controller';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [CoinbaseController],
  providers: [
    {
      provide: 'COINBASE_AUTH_SERVICE',
      useClass: CoinbaseAuthService,
    },
    {
      provide: 'COINBASE_SERVICE',
      useClass: CoinbaseService,
    },
  ],
})
export class CoinbaseModule {}
