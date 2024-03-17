import { CacheType, Client, Collection, Events, GatewayIntentBits, Interaction } from 'discord.js';
import getCommandsCollection from './utils/load_commands.helper';
import dotenv from 'dotenv';
dotenv.config();

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, any>;
	}
}
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
 * Loads the commands for the Discord bot.
 * @param {Client} client - The Discord client.
 * @remarks This function loads the commands for the Discord bot by setting the `commands` property of the client.
 * If an error occurs while loading the commands, the function will log an error message and exit the process with a non-zero exit code.
 */
const loadCommands = (client: Client) => {
	console.info('Loading commands...');
	try {
		client.commands = getCommandsCollection();
	} catch (error) {
		console.error('Failed to load commands', error);
		process.exit(1);
	}
	console.info('Commands loaded!');
};

/**
 * Handles the execution of commands
 * @param {Interaction<CacheType>} interaction - The interaction
 */
const commandHandler = async (interaction: Interaction<CacheType>) => {
	console.info('Handling command...');
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
	console.info('Command handled!');
};

// Boostrap the bot
(async () => {
	console.info('Boostrapping bot...');
	await discordConnection(client);
	loadCommands(client);

	client.on(Events.InteractionCreate, commandHandler);
})();
