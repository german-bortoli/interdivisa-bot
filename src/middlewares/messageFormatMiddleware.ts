import { TelegrafContext } from 'telegraf/typings/context';
import { NextFunction } from 'express';
import { getMessageFormatFromText } from '../utils';
import { LogDeletion, LogOperation } from '../services';

const REPLY_TEXT = `

Su mensaje ha sido borrado porque no cumple el formato de publicación.

Operación: campo requerido
Cantidad: campo requerido
Precio: campo requerido
Forma de pago: opcional
Zona: opcional
Observación: opcional
    
Ejemplo:

Operación: Compra Usd
Cantidad: 5.000
Precio: 158
Forma de pago: Efectivo
Zona: Santa Fe
Observación: 200 en billetes cara chica y el resto cara grande.    
`;

export const messageFormatMiddleware = (
  ctx: TelegrafContext,
  next: NextFunction,
): void | Promise<void | NextFunction> => {
  const message = ctx.message || ctx.update.edited_message;
  if (!message) {
    return next();
  }

  try {
    const registry = getMessageFormatFromText(message.text);
    LogOperation(ctx, registry);
  } catch (e) {
    try {
      ctx.telegram.deleteMessage(ctx.chat.id, message.message_id);
      LogDeletion(ctx);
      //ctx.reply(REPLY_TEXT);
    } catch (er) {
      console.log('ERROR>>', er);
    }
  }

  return next();
};
