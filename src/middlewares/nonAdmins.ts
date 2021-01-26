import { Context } from 'telegraf/typings/context';
import { NextFunction } from 'express';

export const nonAdmins = (ctx: Context, next: NextFunction): void | Promise<void | NextFunction> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (ctx.from._is_in_admin_list || ctx.from.is_bot) {
    return;
  }

  return next(ctx);
};
