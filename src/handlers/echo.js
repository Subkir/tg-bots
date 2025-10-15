const { buildRhymedReply } = require('../utils/rhyme');

module.exports = (ctx) => {
  const text = ctx.message?.text?.trim();
  if (!text) return; // ignore non-text just in case

  const reply = buildRhymedReply(text);
  return ctx.reply(reply);
};


