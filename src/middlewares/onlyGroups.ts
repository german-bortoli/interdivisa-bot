import { Context } from 'telegraf';
import { NextFunction } from 'express';

export const onlyGroups = (ctx: Context, next: NextFunction): void | Promise<void | NextFunction> => {
  if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') {
    return;
  }

  return next(ctx);
};
