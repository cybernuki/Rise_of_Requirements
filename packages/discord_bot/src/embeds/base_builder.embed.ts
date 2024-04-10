import { APIEmbed, EmbedBuilder, EmbedData } from "discord.js";

export class EmbedRoRBuilder extends EmbedBuilder {

  constructor (options?: {setAuthor?:boolean}, data?: EmbedData | APIEmbed) {
    super(data);
    this.setColor('#6A4CE4');

    if (options?.setAuthor) {
      this.setAuthor({ name: 'Rise Of Requirements', iconURL: 'https://static.wikia.nocookie.net/riseofcivilizations/images/5/54/Item_Builder_Recruitment.png/revision/latest/scale-to-width-down/46?cb=20181127142215' })
    }
  }

}