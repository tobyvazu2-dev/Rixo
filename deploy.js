const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once('ready', async () => {
  console.log(`Bot login into ${bot.user.tag}`);

  const commands = [
    new SlashCommandBuilder().setName('info').setDescription('See the info of the bot')
  ]
    .map(command => command.toJSON());

  try {
    await bot.application.commands.set(commands);
    console.log('CMD saved !');
  } catch (error) {
    console.error('Error in the saving of the CMD :', error);
  }
});

bot.login(token);
