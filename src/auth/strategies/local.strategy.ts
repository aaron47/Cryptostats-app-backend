import { UsersService } from './../../users/services/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserResponse } from 'src/users/dto/response/user-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserResponse> {
    return this.usersService.validateUser(email, password);
  }
}
