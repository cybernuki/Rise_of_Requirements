import { SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";
import { BuildingsService } from "./Services/buildings.service";

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
		let choices: string[] = [];

		if (focusedOption.name === 'building') {
			choices = BuildingsService.getBuildingsChoices();
		}

		if (focusedOption.name === 'level') {
			choices = BuildingsService.getLevelChoices();
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