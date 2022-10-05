import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [UsersController],

  providers: [
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'USERS_REPOSITORY',
      useClass: UsersRepository,
    },
  ],
  exports: ['USERS_SERVICE'],
})
export class UsersModule {}
