import { CacheType, Client, Collection, Events, GatewayIntentBits, Interaction } from 'discord.js';
import { getCommandsCollection, config } from './utils';
import { events } from './events';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, any>;
	}
}

/**
 * Connects the client to Discord
 * @param {Client} client - The Discord client
 */
const discordConnection = async (client: Client) => {
	try {
		await client.login(config.token);
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



const registerEvents = (client: Client) => { 
	console.info('Loading events...');

	for (const event of events) {
		if (event.once) {
			console.info('Once event registered :', event.name);
			client.once(event.name, (...args) => {
				// @ts-ignore
				event.execute(...args)
			});
		} else {
			console.info('On event registered :', event.name);
			client.on(event.name, (...args) =>  {
				// @ts-ignore
				event.execute(...args)
			});
		}
	}

	console.info('Events loaded!');
}


// Boostrap the bot
(async () => {
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });
	console.info('Boostrapping bot...');
	registerEvents(client);
	await discordConnection(client);
	loadCommands(client);
	
})();
