import { EmbedRoRBuilder } from "./base_builder.embed";

export class CityHallRequerimentsEmbed {

  private static formatResourceMillions(resource: number) {
    if (resource < 1000000) {
      return String(`${resource / 1000} K`);
    }
    if (resource < 1000000000) {
      return String(`${resource / 1000000} M`);
    }
    return String(`${resource / 1000000000} B`);
  }

  public static getCityHallRequirements(cityHallData: any) {
    const headerEmbed = new EmbedRoRBuilder({ setAuthor: true })
      .setTitle(`City Hall Lv. ${cityHallData.level}`)
      .setThumbnail('https://static.wikia.nocookie.net/riseofcivilizations/images/5/59/Building_City_Hall_1_5.png/revision/latest/scale-to-width-down/500')
      .addFields(
        { name: 'Next level requirements', value: cityHallData.requirements.join('\n') || 'Nothing', inline: true },
        { name: 'Level unlocks', value: cityHallData.unlocks.join('\n') || 'Nothing cool', inline: true },
      );

    const costEmbed = new EmbedRoRBuilder()
      .setTitle(`Resources to next level`);
    const { food, wood, stone } = cityHallData.cost;


    if (food) {
      //TODO make emojis and static information direct to env
      costEmbed.addFields({ name: '<:resource_food:1224522062505185382>', value: this.formatResourceMillions(food), inline: true })
    }

    if (wood) {
      costEmbed.addFields({ name: '<:resource_wood:1224525572361949194>', value: this.formatResourceMillions(wood), inline: true })
    }

    if (stone) {
      costEmbed.addFields({ name: '<:resource_stone:1224525570667319418>', value: this.formatResourceMillions(stone), inline: true })
    }



    return [headerEmbed, costEmbed];
  }

}