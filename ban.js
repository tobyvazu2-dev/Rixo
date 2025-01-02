const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning the user')
                .setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(target.id);

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            await interaction.reply('You do not have permission to ban members.');
            return;
        }

        if (!member) {
            await interaction.reply('User not found in this server.');
            return;
        }

        if (!member.bannable) {
            await interaction.reply('I cannot ban this user. They might have a higher role or I lack permissions.');
            return;
        }

        try {
            await member.ban({ reason });
            await interaction.reply(`${target.tag} has been banned. Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error trying to ban this user.');
        }
    },
};
