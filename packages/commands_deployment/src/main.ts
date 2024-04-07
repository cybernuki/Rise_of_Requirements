import { REST } from 'discord.js';
import { getCommandsCollection } from 'rok_discord_bot/dist/utils'
import { cleanCommands, globalCommandsDeployment, guildCommandsDeployment } from './deployments';

import dotenv from 'dotenv';
dotenv.config();

const config = {
  clientId: process.env.DISCORD_CLIENT_ID || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  token: process.env.DISCORD_TOKEN || '',
};

(async () => {
  const rest = new REST().setToken(config.token);
  const commands = getCommandsCollection();

  await cleanCommands(rest, config.clientId, config.guildId);
  await globalCommandsDeployment(rest, commands, config.clientId)
  await guildCommandsDeployment(rest, commands, config.clientId, config.guildId);
})()