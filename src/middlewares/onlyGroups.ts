import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';

export const onlyGroups = (ctx: TelegrafContext, next: NextFunction) => {

// {
// id: -1001346965376,
// title: 'DevIntDivBot',
// type: 'supergroup',
// }

  if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') {
    return;
  }

  return next();
};
