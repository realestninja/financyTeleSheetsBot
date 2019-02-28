const TelegramBot = require('node-telegram-bot-api');
const process  = require('process');
const fs = require('fs');

const { botToken, ownerID } = require('./credentials/botToken');
const { callSheets } = require('./sheetsApi');

const bot = new TelegramBot(botToken, {polling: true});

console.log('Bot running - pid:', process.pid);
bot.sendMessage(ownerID, "Good morning. I'm awake.");

fs.writeFile('./latest.pid', process.pid, (err) => {
	if(err) throw err;
});

bot.onText(/\/a/, (msg) => {
	const chatId = msg.chat.id;
	if (chatId != ownerID) return;

	const parts = msg.text.split(' ');
	parts.shift(); //get rid off /a

	requestBody = parts.splice(0, 2); //Type and Price

	const itemName = parts.join(' '); //Remains become one string
	requestBody.push(itemName);
	//requestBody consists of type, price and optional string

	callSheets(requestBody);

	bot.sendMessage(chatId, "Got it!");
});
