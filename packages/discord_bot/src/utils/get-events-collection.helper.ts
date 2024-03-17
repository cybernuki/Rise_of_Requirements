import { Collection } from "discord.js";
import { events } from "../events";
import { CommandInterface } from "../commands/interface/command.interface";


/**
 * Retrieves a collection of events.
 * @returns A collection of events.
 */
export const getEventsCollection = (): Collection<string, CommandInterface> => {
  const collection = new Collection<string, any>();

  for (const event of events) {
    const name = event.name;
    collection.set(name, event);
  }
  return collection;
};