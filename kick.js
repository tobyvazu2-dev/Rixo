const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addUserOption(option =>
            option.setName('member')
                .setDescription('The member to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick.')),

    async execute(interaction) {
        const member = interaction.options.getUser('member');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            await interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
            return;
        }

        const targetMember = interaction.guild.members.cache.get(member.id);
        if (!targetMember.kickable) {
            await interaction.reply({ content: 'I cannot kick this member.', ephemeral: true });
            return;
        }

        try {
            await targetMember.kick(reason);
            await interaction.reply(`Member ${member.tag} has been kicked successfully. Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while kicking the member.', ephemeral: true });
        }
    },
};
