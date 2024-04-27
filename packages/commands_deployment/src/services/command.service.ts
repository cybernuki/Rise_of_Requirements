import CommandRepository from "src/database/repository/command.repository";
import CommandInterface from "src/interfaces/command.interface";

export default class CommandService {

  constructor(private repository: CommandRepository) { }

  public async updateCommands(commands: CommandInterface[]) {
    const promises = await Promise.allSettled(commands.map(command => this.repository.updateCommand(command)))

    const rejectedPromises = promises.filter(promise => promise.status === 'rejected')

    if (rejectedPromises.length > 0 ) {
      throw new Error('there was an error updating some commands in the db')
    }
  }
}