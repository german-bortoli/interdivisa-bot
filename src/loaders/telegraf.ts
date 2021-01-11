import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
dotenv.config();

import config from '../config';

export default (): InstanceType<typeof Telegraf> => {
  return new Telegraf(config.botToken);
};
