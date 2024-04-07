import { CommandInterface } from './interface/command.interface';
import cityHallCommands from './city-hall';
import pingCommands from './ping';

const commands: CommandInterface[] = [...cityHallCommands, ...pingCommands];
export default commands;