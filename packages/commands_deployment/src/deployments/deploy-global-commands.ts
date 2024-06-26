import { Collection, REST, Routes } from 'discord.js';
import { CommandInterface } from 'rok_discord_bot/src/commands/interface/command.interface';
import CommandService from 'src/services/command.service';


// and deploy your commands!
export const globalCommandsDeployment = async (
	rest: REST,
	commands: Collection<string, CommandInterface>,
	clientId: string,
	commandService: CommandService
) => {
	try {
		const globalCommands = commands.filter(value => !value.guildOnly);
		console.log(`Started refreshing ${globalCommands.size} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const body = [...globalCommands.mapValues(command => command.data.toJSON()).values()];
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: body },
		) as any[];

		console.log(`Started updating command data to DB`);
		const commandUpdated = data.map(item => { return { name: item.name, id: item.id } })
		await commandService.updateCommands(commandUpdated);

		console.log(`Successfully updated command data to DB`);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
		process.exit(1);
	}
};
