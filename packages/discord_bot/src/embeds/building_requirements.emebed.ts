import { AttachmentBuilder } from "discord.js";
import { EmbedRoRBuilder } from "./base_builder.embed";
import { startCase } from "lodash";
import path from "path";

export class BuildingRequerimentsEmbed {

  private static formatResourceMillions(resource: number) {
    if (resource < 1000) {
      return String(resource)
    }
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
    const buildingAssets = `${buildingData.resource}.png`;
    const buildingFile = new AttachmentBuilder(path.join(__dirname, 'assets', 'buildings', `${buildingData.resource}.png`));

    const { food, wood, stone, arrow_of_resistance, book_of_covenant, master_blueprint } = buildingData.cost;

    const basicRssFields = [];

    if (food) {
      basicRssFields.push({ name: '<:food:1224522062505185382>', value: this.formatResourceMillions(food), inline: true})
    }

    if (wood) {
      basicRssFields.push({ name: '<:wood:1224525572361949194>', value: this.formatResourceMillions(wood), inline: true})
    }

    if (stone) {
      basicRssFields.push({ name: '<:stone:1224525570667319418>', value: this.formatResourceMillions(stone), inline: true})
    }

    if (arrow_of_resistance) {
      basicRssFields.push({ name: '<:arrow_of_resistence:1242137239505473598>', value: this.formatResourceMillions(arrow_of_resistance), inline: true})
    }

    if (book_of_covenant) {
      basicRssFields.push({ name: '<:book_of_covenant:1242136049132769370>', value: this.formatResourceMillions(book_of_covenant), inline: true})
    }

    if (master_blueprint) {
      basicRssFields.push({ name: '<:master_blueprint:1242136083299307611>', value: this.formatResourceMillions(master_blueprint), inline: true})
    }

    const headerEmbed = new EmbedRoRBuilder()
    .setTitle(title)
    .setThumbnail(`attachment://${buildingAssets}`)
    .addFields(
      { name: 'Required Resources', value: ' '},
      ...basicRssFields,
      { name: 'Required Buildings', value: buildingData.requirements.join('\n') || 'Nothing'},
      { name: 'Unlocks', value: buildingData.unlocks.join('\n') || 'Nothing cool'},
    );


    return { embeds: [headerEmbed], files: [buildingFile] };
  }

}