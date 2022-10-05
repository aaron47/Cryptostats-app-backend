import { UserResponse } from './../../../dist/users/dto/UserRespose.dto.d';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { TokenPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<UserResponse> {
    return this.usersService.getUserById(payload.userId);
  }
}
