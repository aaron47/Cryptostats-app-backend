import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/models/User';

const getCurrentUserByContext = (ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
};

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
