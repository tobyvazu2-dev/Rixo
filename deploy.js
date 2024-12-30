const { REST, Routes } = require('discord.js');
const { token, clientId } = require('./config');

const commands = [
    {
        name: 'info',
        description: 'See the info of the bot',
    },
    {
        name: 'kick',
        description: 'Kicks a member from the server',
        options: [
            {
                type: 6, // USER
                name: 'member',
                description: 'The member to kick',
                required: true,
            },
            {
                type: 3, // STRING
                name: 'reason',
                description: 'The reason for the kick',
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Refreshing application commands...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error('Error while registering commands:', error);
    }
})();

