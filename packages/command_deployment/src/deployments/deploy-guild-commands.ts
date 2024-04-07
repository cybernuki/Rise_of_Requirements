import { Collection, REST, Routes } from 'discord.js';
import { CommandInterface } from 'rok_discord_bot/src/commands/interface/command.interface';

// and deploy your commands!
export const guildCommandsDeployment = async (
	rest: REST,
	commands: Collection<string, CommandInterface>,
	clientId: string,
	guildId: string
) => {
	try {
		const guildCommands = commands.filter(value => value.guildOnly);
		console.log(`Started refreshing ${guildCommands.size} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const body = [...guildCommands.mapValues(command => command.data.toJSON()).values()];
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: body },
		) as any[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
		process.exit(1);
	}
};
