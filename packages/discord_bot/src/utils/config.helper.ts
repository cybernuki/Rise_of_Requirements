import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DISCORD_GUILD_ID || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_TOKEN) {
  console.error('Required environment variables are not set.');
  process.exit(1);
}

export const config = {
  clientId: process.env.DISCORD_CLIENT_ID ||'',
  guildId: process.env.DISCORD_GUILD_ID ||'',
  token: process.env.DISCORD_TOKEN ||'',
};
