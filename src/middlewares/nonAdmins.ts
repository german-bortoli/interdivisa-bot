import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';

export const nonAdmins = (ctx: TelegrafContext, next: NextFunction) => {
  // @ts-ignore
  if (ctx.from._is_in_admin_list || ctx.from.is_bot) {
    return;
  }

  return next(ctx);
};
