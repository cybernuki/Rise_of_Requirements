import { REST, Routes } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

const config = {
	clientId: process.env.DISCORD_CLIENT_ID || '',
	guildId: process.env.DISCORD_GUILD_ID || '',
	token: process.env.DISCORD_TOKEN || '',
};

(async () => {
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(config.token);
	try {
		console.log(`Deleting all guild commands.`);
		await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: [] })
		console.log('Successfully deleted all guild commands.')

		console.log(`Deleting all guild commands.`);
		await rest.put(Routes.applicationCommands(config.clientId), { body: [] })
		console.log('Successfully deleted all application commands.')

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
		process.exit(1);
	}
})();
