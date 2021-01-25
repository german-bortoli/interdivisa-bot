import { Context } from 'telegraf';
import { NextFunction } from 'express';
import { getMessageFormatFromText } from '../utils';
import { LogOperation } from '../services';

export const messageFormatMiddleware = async (
  ctx: Context,
  next: NextFunction,
): Promise<void | Promise<void | NextFunction>> => {
  const msg = ctx.message ?? ctx.editedMessage;

  if (!('text' in msg)) {
    return next(ctx);
  }

  const { text, message_id } = msg;

  try {
    const registry = getMessageFormatFromText(text);
    LogOperation(ctx, registry);
  } catch (e) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, message_id);
      // LogDeletion(ctx);
    } catch (er) {
      console.log('ERROR>>', er);
    }
  }

  return next(ctx);
};
