import { SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";


const commands: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('ch requeriments')
    .setDescription('.')
    .addStringOption(option =>
      option.setName('level')
        .setDescription('The requeriment to check')
        .setRequired(true)
        .addChoices(
          { name: 'Funny', value: 'gif_funny' },
          { name: 'Meme', value: 'gif_meme' },
          { name: 'Movie', value: 'gif_movie' },
        )
      ),

  async execute(interaction: any) {
    await interaction.reply('hello', { ephemeral: true });
  },
};
export default commands