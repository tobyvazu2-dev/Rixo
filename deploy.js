const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
const { token, clientId } = require('./config.js');

const commands = [];
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

// Ajouter les commandes 'ban', 'info' et 'kick'
for (const file of commandFiles) {
    const command = require(`./${file}`);
    if (command.data) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

