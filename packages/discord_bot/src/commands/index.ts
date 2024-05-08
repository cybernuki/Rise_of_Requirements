import { CommandInterface } from './interface/command.interface';
import cityHallCommands from './city-hall';
import pingCommands from './ping';
import helpCommands from './help';
import BuildingsCommands from './buildings';

const commands: CommandInterface[] = [...cityHallCommands, ...pingCommands, ...helpCommands, ...BuildingsCommands];
export default commands;