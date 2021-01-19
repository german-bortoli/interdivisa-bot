import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';
import { getMessageFormatFromText } from '../utils';
import { LogDeletion, LogOperation } from '../services';

export const messageFormatMiddleware = (
  ctx: TelegrafContext,
  next: NextFunction,
): void | Promise<void | NextFunction> => {
  try {
    const registry = getMessageFormatFromText(ctx.message.text);
    LogOperation(ctx, registry);
  } catch (e) {
    try {
      ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
      LogDeletion(ctx);
    } catch (e) {
      console.log('ERROR>>', e);
    }
  }

  return next();
};
