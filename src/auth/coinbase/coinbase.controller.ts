import { CoinbaseAuthService } from './coinbase-auth.service';
import { JwtGuard } from './../guards/jwt-auth.guard';
import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserResponse } from 'dist/users/dto/UserRespose.dto';
import { CoinbaseService } from './coinbase.service';

@Controller('coinbase')
export class CoinbaseController {
  constructor(
    @Inject('COINBASE_AUTH_SERVICE')
    private readonly coinbaseAuthService: CoinbaseAuthService,
    @Inject('COINBASE_SERVICE')
    private readonly coinbaseService: CoinbaseService,
  ) {}

  @Get('auth')
  @UseGuards(JwtGuard)
  authorize(@Res() res: Response): void {
    this.coinbaseAuthService.authorize(res);
  }

  @Get('auth/callback')
  @UseGuards(JwtGuard)
  handleCallback(@Req() req: Request, @Res() res: Response) {
    this.coinbaseAuthService.handleCallback(req, res);
  }

  @Get()
  @UseGuards(JwtGuard)
  getCoinbaseData(@CurrentUser() user: UserResponse): Promise<any> {
    return this.coinbaseService.getPrimaryAccountTransactions(user._id);
  }
}
