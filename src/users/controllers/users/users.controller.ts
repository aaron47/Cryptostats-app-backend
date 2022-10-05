import { LocalAuthGuard } from './../../../auth/guards/local-auth.guard';
import { CreateUserRequest } from './../../dto/request/create-user-request.dto';
import { CreateUserDto } from './../../dto/CreateUserDto.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.createUser(createUserRequest);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getUser(@CurrentUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }
}
