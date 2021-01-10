import telegraf from './loaders';
import { onlyGroups, appendAdmins, nonAdmins } from './middlewares';

const main = async () => {
  const bot = telegraf();
  bot.start((ctx) => ctx.reply('Bienvenido'));
  bot.help((ctx) => ctx.reply('InterDivisa Bot'));

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
  });

  bot.use(appendAdmins);

  bot.on('text', onlyGroups, nonAdmins, (ctx) => {
    // @TODO: Comparar el texto ctx.message.text.toLowerCase() con las lienas habilitadas

    // [ 'operación:', 'cantidad:', 'precio:', 'zona: ', 'observación:' ]
    // console.log(ctx.message.text.toLowerCase().split('\n'));

    ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  });

  bot.launch().then(() => {
    console.log('Bot has been started');
  });
};

main();
