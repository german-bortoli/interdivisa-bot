import telegraf from './loaders';

const main = async () => {
  const bot = telegraf();
  bot.start((ctx) => ctx.reply('Bienvenido'));
  bot.help((ctx) => ctx.reply('InterDivisa Bot'));

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
  });

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
