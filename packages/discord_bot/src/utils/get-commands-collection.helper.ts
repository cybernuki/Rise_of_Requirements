import { Collection } from "discord.js";
import commands from "../commands";
import { CommandInterface } from "../commands/interface/command.interface";


/**
 * Retrieves a collection of commands.
 * @returns A collection of commands.
 * @throws {Error} If a command is missing a required "data" or "execute" property.
 */
export const getCommandsCollection = (): Collection<string, CommandInterface> => {
  const collection = new Collection<string, CommandInterface>();

  for (const command of commands) {
    const name = command.data.name;
    if ('data' in command && 'execute' in command) {
      collection.set(command.data.name, command);
    } else {
      throw new Error(`The command at ${name} is missing a required "data" or "execute" property.`, { cause: 'missing data or execute property' });
    }
  }
  return collection;
};