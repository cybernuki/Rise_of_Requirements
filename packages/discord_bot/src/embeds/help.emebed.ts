import { EmbedRoRBuilder } from "./base_builder.embed";

export class HelpEmbed {


  public static gethelp() {
    const headerEmbed = new EmbedRoRBuilder({setAuthor: true})
      .setTitle(`How to use Rise Of Requeriments:`)
      .setDescription('To use Rise of Requirements use the command /buildings followed by the building name and the level you want to check')
      .addFields(
        {name: 'Invite Rise of Requirements to your own server!', value: '[Click me!](https://dsc.gg/riseofrequirements)'},
        {name: `Support the bot for fun! I'm planing great and cool commands!`, value: '[Click me!](https://ko-fi.com/riseofrequirements)'}
        );
    return [headerEmbed];
  }

}
