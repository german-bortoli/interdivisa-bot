import * as dotenv from 'dotenv';
import { Telegraf, Context } from 'telegraf';
dotenv.config();

import config from '../config';

interface BotContext extends Context {
  _admins: any[];
}

export default (): InstanceType<typeof Telegraf> => {
  return new Telegraf<BotContext>(config.botToken);
};
