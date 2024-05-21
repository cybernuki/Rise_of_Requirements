import { MessagePayload, SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";
import { BuildingsService } from "./Services/buildings.service";
import { BuildingRequerimentsEmbed } from "../../embeds/building_requirements.emebed";

const BuildingsCommand: CommandInterface = {
	data: new SlashCommandBuilder()
		.setName('buildings')
		.setDescription('Check what requirements do you need to level up your buildings!')
		.setNSFW(false)
		.addStringOption(option =>
			option.setName('building')
				.setRequired(true)
				.setDescription('Choose a building')
				.addChoices(...BuildingsService.getBuildingsChoices())
		)
		.addIntegerOption(option =>
			option.setName('level')
				.setDescription('choose a level')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(25)
		),

	async execute(interaction) {
		await interaction.deferReply();
		const name = interaction.options.getString('building', true);
		const level = interaction.options.getInteger('level', true);
		const buildingEmbed = BuildingsService.findBuildingByLevel(name, level);

		const messagePayload: MessagePayload = new MessagePayload(interaction.user, {...buildingEmbed});
		console.log(`Replying to ${name} Lv. ${level}`);
		await interaction.editReply(messagePayload);
	}
};
export default BuildingsCommand