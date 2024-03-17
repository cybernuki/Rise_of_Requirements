import { SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";

const commands: CommandInterface[] =[{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction:any) {
		await interaction.reply('Pong!');
	},
}];
export default commands