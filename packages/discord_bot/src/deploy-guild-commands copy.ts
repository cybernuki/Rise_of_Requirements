import { REST, Routes } from 'discord.js';
import { getCommandsCollection, config } from './utils';

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
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: body },
		) as any[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
    process.exit(1);
	}
})();