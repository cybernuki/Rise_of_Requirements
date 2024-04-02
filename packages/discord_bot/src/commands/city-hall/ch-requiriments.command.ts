import { CacheType, ChatInputCommandInteraction, MessagePayload, SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";
import { CityHallService } from "./services/city_hall.service";
import { CityHallRequerimentsEmbed } from "../../embeds/city_hall_requierements.emebed";

const chRequirementCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('chrequeriments')
    .setDescription('.')
    .addStringOption(option =>
      option.setName('level')
        .setDescription('The requeriment to check')
        .setRequired(true)
        .addChoices(
          ...CityHallService.getChoices()
        )
    ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply({  ephemeral: true });
    const cityHall = CityHallService.findCityHallByLevel(interaction.options.getString('level', true))
  
    const messagePayload : MessagePayload = new MessagePayload(interaction.user,{embeds: [...CityHallRequerimentsEmbed.getCityHallRequirements(cityHall)]});
    await interaction.editReply(messagePayload);
  },
};
export default chRequirementCommand