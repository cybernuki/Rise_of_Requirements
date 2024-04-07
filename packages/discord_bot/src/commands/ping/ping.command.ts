import { CacheType, ChatInputCommandInteraction, MessagePayload, SlashCommandBuilder } from "discord.js";
import { CommandInterface } from "../interface/command.interface";

const chRequirementCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get information healt information of the bot')
    .setNSFW(false),
  guildOnly: true,
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms \n Websocket heartbeat: ${interaction.client.ws.ping}ms.`);
  },
};
export default chRequirementCommand