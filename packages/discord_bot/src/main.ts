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
client.commands = new Collection();
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const bootstrap = async (client: Client) => {
	try {
		await client.login(process.env.DISCORD_TOKEN);
	} catch (error) {
		console.error('Failed to login to discord', error);
		process.exit(1);
	}
};

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


(async () => {
	await bootstrap(client);
	loadCommands(client);

	client.on(Events.InteractionCreate, commandHandler);
})();