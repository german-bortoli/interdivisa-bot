import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';

export const appendAdmins = (ctx: TelegrafContext, next: NextFunction): void | Promise<void | NextFunction> => {
  if (ctx.chat.id > 0) {
    return next();
  }

  /// need to cache this result ( variable or session or ....)
  /// because u don't need to call this method
  /// every message
  return ctx.telegram
    .getChatAdministrators(ctx.chat.id)
    .then((data) => {
      if (!data || !data.length) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.chat._admins = data;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.from._is_in_admin_list = data.some((adm) => adm.user.id === ctx.from.id);
    })
    .catch(console.log)
    .then(() => next(ctx));
};
