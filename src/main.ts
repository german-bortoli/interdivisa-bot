import telegraf from './loaders';
import { onlyGroups, appendAdmins, nonAdmins, messageFormatMiddleware } from './middlewares';
import fastify from 'fastify';
import { REPLY_TEXT } from './constants';
import config from './config';
import { Context } from 'telegraf';

function getMessageFromAnySource(ctx: Context) {
  return ctx.message ?? ctx.editedMessage ?? ctx.callbackQuery?.message ?? ctx.channelPost ?? ctx.editedChannelPost;
}

const server = fastify({
  logger: config.env !== 'production',
});

server.get('/', async (request, reply) => {
  return { bot: 'alive', env: process.env.NODE_ENV };
});

const initRestServer = async () => {
  try {
    await server.listen(process.env.PORT ?? '3000', '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

const main = async () => {
  const bot = await telegraf();
  bot.start((ctx) => ctx.reply('Bienvenido'));
  bot.help((ctx) => ctx.reply(REPLY_TEXT));

  // bot.telegram.getMe().then((botInfo) => {
  //   bot.options.username = botInfo.username;
  // });

  bot.use(appendAdmins);
  bot.on(['text', 'edited_message'], onlyGroups, nonAdmins, messageFormatMiddleware);

  bot.catch((err: Error, ctx: Context) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
  });

  bot.launch().then(async () => {
    console.log('Bot has been started');
    await initRestServer();
  });

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop());
  process.once('SIGTERM', () => bot.stop());
};

main();
