import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthJwtPayload } from '@/modules/auth/types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthJwtPayload;
  },
);
