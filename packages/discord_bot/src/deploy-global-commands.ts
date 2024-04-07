import { REST, Routes } from 'discord.js';
import { getCommandsCollection } from './utils';

import dotenv from 'dotenv';
dotenv.config();

const config = {
  clientId: process.env.DISCORD_CLIENT_ID ||'',
  guildId: process.env.DISCORD_GUILD_ID ||'',
  token: process.env.DISCORD_TOKEN ||'',
}

const commands = getCommandsCollection();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.size} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const body = [...commands.mapValues(command => command.data.toJSON()).values()];
		const data = await rest.put(
			Routes.applicationCommands(config.clientId),
			{ body: body },
		) as any[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
    process.exit(1);
	}
})();
