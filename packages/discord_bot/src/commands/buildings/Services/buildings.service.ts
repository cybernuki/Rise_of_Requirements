
export class BuildingsService {

  protected static _BUILDINGS_METADATA = {
    'city hall': { jsonFile: 'City_Hall' },
    'academy': { jsonFile: 'Academy' },
    'alliance center': { jsonFile: 'Alliance_Center' },
    'archery range': { jsonFile: 'Archery_Range' },
    'barracks': { jsonFile: 'Barracks' },
    'castle': { jsonFile: 'Castle' },
    'farm': { jsonFile: 'Farm' },
    'goldmine': { jsonFile: 'Goldmine' },
    'hospital': { jsonFile: 'Hospital' },
    'lumber mill': { jsonFile: 'Lumber_Mill' },
    'quarry': { jsonFile: 'Quarry' },
    'scout camp': { jsonFile: 'Scout_Camp' },
    'siege workshop': { jsonFile: 'Siege_Workshop' },
    'stable': { jsonFile: 'Stable' },
    'storehouse': { jsonFile: 'Storehouse' },
    'tavern': { jsonFile: 'Tavern' },
    'trading post': { jsonFile: 'Trading_Post' },
    'wall': { jsonFile: 'Wall' },
    'watchtower': { jsonFile: 'Watchtower' }
  };

  public static getBuildingsChoices() {
    return Object.keys(this._BUILDINGS_METADATA);
  }

  public static getLevelChoices() {
    return new Array(25).fill(null).map((_, i) => `${i + 1}`);
  }

  /* public static findCityHallByLevel(level: String | Number) {
    if (typeof level === 'string') {
      level = parseInt(level)
    }
    return cityHallData.find(city_hall => level === city_hall.level);
  } */
}