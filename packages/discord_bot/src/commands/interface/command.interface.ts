import { Interaction, SlashCommandBuilder } from "discord.js";

export interface CommandInterface {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction<any>) => Promise<void>;
}