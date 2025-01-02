const Discord = require('discord.js'); 
const { token } = require('./config'); 
const bot = new Discord.Client({ intents: new Discord.IntentsBitField(53608447) });
bot.commands = new Discord.Collection();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); 


bot.login(token);
bot.once('ready', () => {
  console.log(`Login into ${bot.user.tag}!`);
  bot.user.setActivity('Moderate !', { type: 'PLAYING' })
})
bot.on('messageCreate', message => {
      if (message.content === "What is the best middle school ?") {
      message.reply("[Middle school Gay-Lussac](https://www.google.com/maps/place/Coll%C3%A8ge+Gay+Lussac/@48.9252994,2.2483311,1144m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e665cf6819395f:0xbeb91dd6df904744!8m2!3d48.9252994!4d2.2483311!16s%2Fg%2F1tdzqfj4?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D)")
      }
      if (message.content === "help") {
        message.reply("Ping a staff or wait until a staff see your message")
      }
}); 


bot.on('guildMemberAdd', async member => {
  const welcomeEmbed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('Welcome at the server !')
    .setDescription(`Hey ${member.user.username}, we are happy to say to you welcome to **${member.guild.name}** ! 🎉`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: 'We hope you will be happy in this server !' });

  try {
    await member.send({ embeds: [welcomeEmbed] });
    console.log(`Message sent to ${member.user.tag}.`);
  } catch (error) {
    console.error(`Cant DM  ${member.user.tag}:`, error);
  }
});
