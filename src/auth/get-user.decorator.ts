import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Jika field diberikan (contoh: @GetUser('id')), kembalikan field tersebut
    if (field) {
      return user?.[field];
    }

    // Jika tidak ada field, kembalikan seluruh user
    return user;
  },
);
