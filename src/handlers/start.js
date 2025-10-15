module.exports = (ctx) => {
  const name = ctx.from?.first_name || 'друг';
  return ctx.reply(`Привет, ${name}! Я рифмую всё, что ты пришлёшь. Напиши слово или фразу — отвечу двустишием.`);
};


