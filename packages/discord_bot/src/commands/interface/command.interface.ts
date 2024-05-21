import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CommandInterface {
  data: any;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
  guildOnly?: boolean | undefined;
}