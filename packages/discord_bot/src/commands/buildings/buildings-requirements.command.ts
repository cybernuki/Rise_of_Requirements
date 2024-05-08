import { SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";

const BuildingsCommand: CommandInterface = {
	data: new SlashCommandBuilder()
		.setName('buildings')
		.setDescription('Check what requirements do you need to level up your buildings!')
		.setNSFW(false)
		.addStringOption(option =>
			option.setName('building')
				.setRequired(true)
				.setDescription('Choose a building')
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('level')
				.setDescription('choose a level')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices: any[] = [];

		if (focusedOption.name === 'building') {
			choices = [
				"city hall",
				"academy",
				"alliance center",
				"archery range",
				"barracks",
				"castle",
				"farm",
				"goldmine",
				"hospital",
				"lumber mill",
				"quarry",
				"scout camp",
				"siege workshop",
				"stable",
				"storehouse",
				"tavern",
				"trading post",
				"wall",
				"watchtower",
			];
		}

		if (focusedOption.name === 'level') {
			choices = new Array(25).fill(null).map((_, i) => `${i+1}`);
		}

		const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},

	async execute(interaction) {
		await interaction.reply(`you've chosen ${interaction.options.get('building')?.value} lvl ${interaction.options.get('level')?.value}`)
	}
};
export default BuildingsCommand