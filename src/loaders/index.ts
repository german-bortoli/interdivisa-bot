import telegraf from './telegraf';
import database from './database';
import { Telegraf } from 'telegraf';

export default async (): Promise<InstanceType<typeof Telegraf>> => {
  await database();
  return telegraf();
};
