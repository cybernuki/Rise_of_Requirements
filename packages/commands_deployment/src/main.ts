import { REST } from 'discord.js';
import { getCommandsCollection } from 'rok_discord_bot/dist/utils'
import { cleanCommands, globalCommandsDeployment, guildCommandsDeployment } from './deployments';

import dotenv from 'dotenv';
import CommandRepository from './database/repository/command.repository';
import ConfigInterface from './interfaces/config.interface';
import CommandService from './services/command.service';
dotenv.config();

const config = {
  clientId: process.env.DISCORD_CLIENT_ID || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  token: process.env.DISCORD_TOKEN || '',
};

const dbConfig: ConfigInterface = {
  accessKeyId: process.env.AWS_ACCESS_KEY || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || '',
  tableName: process.env.AWS_TABLE_NAME || '',
};

(async () => {
  const rest = new REST().setToken(config.token);
  const commands = getCommandsCollection();
  const commandRepository = new CommandRepository(dbConfig);
  const commandService = new CommandService(commandRepository);

  await cleanCommands(rest, config.clientId, config.guildId);
  await globalCommandsDeployment(rest,
    commands,
    config.clientId,
    commandService
  )
  await guildCommandsDeployment(
    rest,
    commands,
    config.clientId,
    config.guildId
  );
})()