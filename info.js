const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config');
const { SlashCommandBuilder } = require('@discordjs/builders');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once('ready', () => {
  console.log(`Bot login in the ${bot.user.tag}!`);
});

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'info') {
    const infoEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Here is Rixo !!')
      .setDescription('Rixo is a bot make all by tobyvazu2 and with node.js.')
      .setTimestamp()
      .setFooter({ text: 'Bot by tobyvazu2' });

    await interaction.reply({ embeds: [infoEmbed] });
  }
});

bot.on('ready', async () => {
  const commands = [
    new SlashCommandBuilder()
      .setName('info')
      .setDescription('See the info of the bot'),
  ].map(command => command.toJSON());

  try {
    await bot.application.commands.set(commands);
    console.log('CMD saved !');
  } catch (error) {
    console.error('Error in the saving of the CMD :', error);
  }
});

bot.login(token);
