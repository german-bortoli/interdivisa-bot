import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';

export const onlyGroups = (ctx: TelegrafContext, next: NextFunction): void | Promise<void | NextFunction> => {
  if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') {
    return;
  }

  return next();
};
