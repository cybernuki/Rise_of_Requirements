import { CacheType, ChatInputCommandInteraction, MessagePayload, SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";
import { HelpEmbed } from "../../embeds/help.emebed";

const helpCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('you have any doubt about Rise of Requirements? ask /help!')
    .setNSFW(false),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply({  ephemeral: true });
  
    const messagePayload : MessagePayload = new MessagePayload(interaction.user,{embeds: [...HelpEmbed.gethelp()]});
    await interaction.editReply(messagePayload);
  },
};
export default helpCommand