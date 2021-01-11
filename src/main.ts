import telegraf from './loaders';
import { onlyGroups, appendAdmins, nonAdmins } from './middlewares';
import { getMessageFormatFromText } from './utils';
import { LogDeletion, LogOperation } from './services';

const main = async () => {
  const bot = await telegraf();
  bot.start((ctx) => ctx.reply('Bienvenido'));
  bot.help((ctx) => ctx.reply('InterDivisa Bot'));

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
  });

  bot.use(appendAdmins);

  bot.on('text', onlyGroups, nonAdmins, (ctx) => {
    try {
      const registry = getMessageFormatFromText(ctx.message.text);
      LogOperation(ctx, registry);
    } catch (e) {
      ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
      LogDeletion(ctx);
    }
  });

  bot.launch().then(() => {
    console.log('Bot has been started');
  });
};

main();
