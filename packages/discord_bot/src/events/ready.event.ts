import { Events, Client } from 'discord.js';
import { EventInterface } from './interface/event.interface';

export const readyEvent =  {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
} as EventInterface;