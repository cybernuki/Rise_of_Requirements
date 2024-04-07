import { REST, Routes } from 'discord.js';

export const cleanCommands = async (rest: REST, clientId: string, guildId: string) => {
	try {
		console.log(`Deleting all guild commands.`);
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
		console.log('Successfully deleted all guild commands.')

		console.log(`Deleting all guild commands.`);
		await rest.put(Routes.applicationCommands(clientId), { body: [] })
		console.log('Successfully deleted all application commands.')

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
		process.exit(1);
	}
};