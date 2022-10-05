import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Response } from 'express';
import { User } from 'src/models/User';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.login(user, response);
    response.send(user);
  }
}
