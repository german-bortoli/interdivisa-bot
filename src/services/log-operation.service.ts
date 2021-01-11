import { TelegrafContext } from 'telegraf/typings/context';
import { MessageFormat } from '../utils';
import { getRepository } from 'typeorm';
import { OperationEntity } from '../entities/operation.entity';
import { UserHistoryEntity } from '../entities/userHistory.entity';

export const LogOperation = (ctx: TelegrafContext, operation: MessageFormat) => {
  const OperationRepository = getRepository(OperationEntity);

  const record = {
    userId: String(ctx.from.id),
    groupName: ctx.chat.title ? ctx.chat.title.toLowerCase() : 'inder-divisas',
    operation: operation.operation,
    operationType: operation.operationType,
    paymentOption: operation.paymentOption,
    quantity: operation.quantity,
    price: operation.price,
    location: operation.location,
    notes: operation.notes,
    firstName: ctx.from.first_name ?? null,
    lastName: ctx.from.last_name ?? null,
    username: ctx.from.username ?? null,
    language: ctx.from.language_code ?? 'es',
  };

  try {
    OperationRepository.insert(record);
  } catch (e) {
    console.log('>> ERROR', e);
  }
};

export const LogDeletion = (ctx) => {
  const OperationRepository = getRepository(UserHistoryEntity);

  const record = {
    userId: String(ctx.from.id),
    groupName: ctx.chat.title ? ctx.chat.title.toLowerCase() : 'inder-divisas',
  };

  try {
    OperationRepository.insert(record);
  } catch (e) {
    console.log('>> ERROR', e);
  }
}
