import telegraf from './telegraf';
import database from './database';

export default async () => {
  await database();
  return telegraf();
};
