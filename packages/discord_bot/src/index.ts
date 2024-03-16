import { Client, Events, GatewayIntentBits } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

const bootstrap = async () => {
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	client.once(Events.ClientReady, readyClient => {
		console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	});

	try {
		await client.login(process.env.DISCORD_TOKEN);
	} catch (error) {
		console.error('Failed to login to discord', error);
		process.exit(1);
	}
};


bootstrap();
