import { CommandInterface } from './interface/command.interface';
import cityHallCommands from './city-hall';
import pingCommands from './ping';
import helpCommands from './help';

const commands: CommandInterface[] = [...cityHallCommands, ...pingCommands, ...helpCommands];
export default commands;