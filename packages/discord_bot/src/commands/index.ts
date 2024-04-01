import { CommandInterface } from './interface/command.interface';
import cityHallCommands from './city-hall';

const commands: CommandInterface[] = [...cityHallCommands];
export default commands;