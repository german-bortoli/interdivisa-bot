import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
dotenv.config();

export default () => {
  return new Telegraf(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');
};
