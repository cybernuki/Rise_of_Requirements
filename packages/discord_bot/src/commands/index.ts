import { CommandInterface } from './interface/command.interface';
import pingCommands from './ping';
import helpCommands from './help';
import BuildingsCommands from './buildings';

const commands: CommandInterface[] = [...pingCommands, ...helpCommands, ...BuildingsCommands];
export default commands;