import telegraf from './loaders';
import { onlyGroups, appendAdmins, nonAdmins } from './middlewares';
import { getMessageFormatFromText } from './utils';
import { LogDeletion, LogOperation } from './services';
import fastify from 'fastify';
import { TelegrafContext } from 'telegraf/typings/context';

const server = fastify({
  logger: true,
});

server.get('/', async (request, reply) => {
  return { bot: 'alive' };
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
  bot.help((ctx) => ctx.reply('InterDivisa Bot'));

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
  });

  bot.use(appendAdmins);

  bot.on('text', onlyGroups, nonAdmins, (ctx: TelegrafContext) => {
    try {
      const registry = getMessageFormatFromText(ctx.message.text);
      LogOperation(ctx, registry);
    } catch (e) {
      ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
      LogDeletion(ctx);
    }
  });

  bot.launch().then(async () => {
    console.log('Bot has been started');
    await initRestServer()
  });
};

main();
