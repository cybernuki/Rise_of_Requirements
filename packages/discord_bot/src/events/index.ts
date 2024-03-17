import { interactionCreateEvent } from "./interaction-create.event";
import { EventInterface } from "./interface/event.interface";
import { readyEvent } from "./ready.event";

export const events: EventInterface[] = [readyEvent, interactionCreateEvent];