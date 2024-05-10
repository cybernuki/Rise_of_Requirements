import { AttachmentBuilder } from "discord.js";
import { EmbedRoRBuilder } from "./base_builder.embed";
import { startCase } from "lodash";
import path from "path";

export class BuildingRequerimentsEmbed {

  private static formatResourceMillions(resource: number) {
    if (resource < 1000000) {
      return String(`${resource / 1000} K`);
    }
    if (resource < 1000000000) {
      return String(`${resource / 1000000} M`);
    }
    return String(`${resource / 1000000000} B`);
  }

  public static getBuildingRequirements(buildingData: any) {
    const title = `${startCase(buildingData.name)} Lv. ${buildingData.level}`;
    const ImageResource = `${buildingData.resource}.png`;
    const ImageFile = new AttachmentBuilder(path.join(__dirname, 'assets', `${buildingData.resource}.png`));

    const headerEmbed = new EmbedRoRBuilder({ setAuthor: true })
      .setTitle(title)
      .setThumbnail(`attachment://${ImageResource}`)
      .addFields(
        { name: 'Level requirements', value: buildingData.requirements.join('\n') || 'Nothing', inline: true },
        { name: 'Level unlocks', value: buildingData.unlocks.join('\n') || 'Nothing cool', inline: true },
      );

    const costEmbed = new EmbedRoRBuilder()
      .setTitle(`Resources to unlock level`);
    const { food, wood, stone } = buildingData.cost;


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



    return { embeds: [headerEmbed, costEmbed], files: [ImageFile] };
  }

}