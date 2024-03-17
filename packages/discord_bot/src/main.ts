import { CacheType, Client, Collection, Events, GatewayIntentBits, Interaction } from 'discord.js';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, any>;
	}
}

import commands from './commands';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/**
 * Event handler for when the client is ready
 * @param {Client} readyClient - The ready client
 */
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

/**
 * Connects the client to Discord
 * @param {Client} client - The Discord client
 */
const discordConnection = async (client: Client) => {
	try {
		await client.login(process.env.DISCORD_TOKEN);
	} catch (error) {
		console.error('Failed to login to discord', error);
		process.exit(1);
	}
};

/**
 * Loads the commands into the client
 * @param {Client} client - The Discord client
 */
const loadCommands = async (client: Client) => {
	try {
		for (const command of commands) {
			const name = command.data.name;
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				throw new Error(`The command at ${name} is missing a required "data" or "execute" property.`, { cause: 'missing data or execute property' });
			}
		}
	} catch (error) {
		console.error('Failed to load commands', error);
		process.exit(1);
	}
};

/**
 * Handles the execution of commands
 * @param {Interaction<CacheType>} interaction - The interaction
 */
const commandHandler = async (interaction: Interaction<CacheType>) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
};

// Boostrap the bot
(async () => {
	await discordConnection(client);
	loadCommands(client);

	client.on(Events.InteractionCreate, commandHandler);
})();
