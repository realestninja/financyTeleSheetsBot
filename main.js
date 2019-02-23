const TelegramBot = require('node-telegram-bot-api');
const process  = require('process');

const { botToken, ownerID } = require('./credentials/botToken');
const { callSheets } = require('./sheetsApi');

const bot = new TelegramBot(botToken, {polling: true});

console.log('Bot running - pid:', process.pid);

bot.onText(/\/a/, (msg) => {
	const chatId = msg.chat.id;
	if (chatId != ownerID) return;

	const parts = msg.text.split(' ');
	parts.shift(); //get rid off /a

	requestBody = parts.splice(0, 2);

	const itemName = parts.join(' ');
	requestBody.push(itemName);

	callSheets(requestBody);

	bot.sendMessage(chatId, "Got it!");
});
