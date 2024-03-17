import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

export interface CommandInterface {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction<CacheType>) => Promise<void>;
}