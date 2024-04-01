import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";
import city_hall_data from './city_hall.json';

const choices = city_hall_data.map((level_req: { level: any; }) => { return { name: String(level_req.level), value: String(level_req.level) } });
const chRequirementCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('chrequeriments')
    .setDescription('.')
    .addStringOption(option =>
      option.setName('level')
        .setDescription('The requeriment to check')
        .setRequired(true)
        .addChoices(
          ...choices
        )
    ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply({  ephemeral: true });
    const city_hall = city_hall_data.find(city_hall => interaction.options.getString('level') === String(city_hall.level));
    
    const  payload = city_hall?.requirements.join(' ') || '';
    await interaction.editReply(payload);
  },
};
export default chRequirementCommand