import { CoinbaseAuth } from '../models/CoinbaseAuth.model';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'LOCAL_STRATEGY',
      useClass: LocalStrategy,
    },
    {
      provide: 'JWT_STRATEGY',
      useClass: JwtStrategy,
    },
    {
      provide: 'ENCRYPTION_SERVICE',
      useClass: EncryptionService,
    },
  ],
  exports: ['ENCRYPTION_SERVICE'],
})
export class AuthModule {}
