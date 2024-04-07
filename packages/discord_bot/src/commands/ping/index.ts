import { CommandInterface } from '../interface/command.interface';
import pingCommand from './ping.command';

const pingCommands: CommandInterface[] = [pingCommand];

export default pingCommands;

