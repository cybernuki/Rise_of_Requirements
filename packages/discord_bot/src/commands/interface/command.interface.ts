import { Interaction, SlashCommandBuilder } from "discord.js";

export interface CommandInterface {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: Interaction<any>) => Promise<void>;
}