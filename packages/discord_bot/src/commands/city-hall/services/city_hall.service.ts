import cityHallData from './city_hall.json';

export class CityHallService {

  public static getChoices() {
    return cityHallData.map((level_req: { level: any; }) => { return { name: String(level_req.level), value: String(level_req.level) } });
  }

  public static findCityHallByLevel(level: String | Number) {
    if (typeof level === 'string') {
      level = parseInt(level)
    }
    return cityHallData.find(city_hall => level === city_hall.level);
  }
}