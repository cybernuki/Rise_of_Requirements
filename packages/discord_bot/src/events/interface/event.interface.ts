import { ClientEvents, } from "discord.js";

export interface EventInterface {
  name: keyof ClientEvents;
  execute: (arg: any) => Promise<void>;
  once?: boolean | undefined;
}