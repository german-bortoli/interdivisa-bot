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

    // console.log(ctx.chat?.type)
  // bot.on('sticker', (ctx) => ctx.reply('Stickers are not allowed :D'));
  // bot.on('animation', (ctx) => ctx.reply('Animations are not allowed :D'));
  // bot.on('photo', (ctx) => ctx.reply('Photos are not allowed :D'));
  // bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  // bot.on('text', async (ctx) => {
  //   console.log('De', ctx.message.from, '>>> NENSAJE', ctx.message.text.toLowerCase());
  //   // const isAdmin = await bot.telegram.getChatAdministrators(ctx.chat.id)
  //   //
  //   // console.log('IS ADMIN ?', isAdmin, ctx.chat)
  // });

  bot.launch();
};

main();
