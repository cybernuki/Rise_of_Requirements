import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CommandInterface {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
  guildOnly?: boolean | undefined;
}