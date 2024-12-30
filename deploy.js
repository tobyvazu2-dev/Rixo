const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once('ready', async () => {
  const commands = [
    new SlashCommandBuilder().setName('info').setDescription('See the info of the bot'),
    new SlashCommandBuilder().setName('kick').setDescription('Kicks a member from the server')
      .addUserOption(option =>
        option.setName('member')
          .setDescription('The member to kick.')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('reason')
          .setDescription('The reason for the kick.'))
  ]
    .map(command => command.toJSON());

  try {
    const existingCommands = await bot.application.commands.fetch();
    for (const command of commands) {
      const existingCommand = existingCommands.find(cmd => cmd.name === command.name);
      if (existingCommand) {
        await bot.application.commands.edit(existingCommand.id, command);
      } else {
        await bot.application.commands.create(command);
      }
    }
    console.log('Commands successfully registered.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
});

bot.login(token);
