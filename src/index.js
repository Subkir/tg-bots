require('dotenv').config();
const { Telegraf } = require('telegraf');

const startHandler = require('./handlers/start');
const helpHandler = require('./handlers/help');
const echoHandler = require('./handlers/echo');

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  console.error('Missing BOT_TOKEN in environment. Please set it in .env');
  process.exit(1);
}

const bot = new Telegraf(botToken);

bot.start(startHandler);
bot.help(helpHandler);

// Echo only for text messages; ignore others gracefully
bot.on('text', echoHandler);

async function launch() {
  try {
    // Ensure webhook is removed for local polling
    await bot.telegram.deleteWebhook({ drop_pending_updates: true }).catch(() => {});
    await bot.launch();
    console.log('Bot started (polling). Press Ctrl+C to stop.');
  } catch (err) {
    console.error('Failed to launch bot:', err);
    process.exit(1);
  }
}

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

launch();


