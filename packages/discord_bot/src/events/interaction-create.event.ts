import  { Collection, Events, Interaction }  from 'discord.js';
import { EventInterface } from './interface/event.interface';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, any>;
	}
}

export const interactionCreateEvent = {
	name: Events.InteractionCreate,
  once: false,
	async execute(interaction:Interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			if (interaction.isChatInputCommand()) {
				await command.execute(interaction);
			}
			if (interaction.isAutocomplete()) {
				await command.autoComplete();
			}
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
} as EventInterface;