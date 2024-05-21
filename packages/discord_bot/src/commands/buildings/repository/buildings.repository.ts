import path from "path";
import fs from "fs";
export class BuildingsRepository {

  protected _jsonPath = path.join(__dirname, 'embeds')
  protected _BUILDINGS_METADATA: { name: string, resource: string, data: any[] }[] = [
    { name: 'city hall', resource: 'City_Hall', data: [] },
    { name: 'academy', resource: 'Academy', data: [] },
    { name: 'alliance center', resource: 'Alliance_Center', data: [] },
    { name: 'archery range', resource: 'Archery_Range', data: [] },
    { name: 'barracks', resource: 'Barracks', data: [] },
    { name: 'castle', resource: 'Castle', data: [] },
    { name: 'farm', resource: 'Farm', data: [] },
    { name: 'goldmine', resource: 'Goldmine', data: [] },
    { name: 'hospital', resource: 'Hospital', data: [] },
    { name: 'lumber mill', resource: 'Lumber_Mill', data: [] },
    { name: 'quarry', resource: 'Quarry', data: [] },
    { name: 'scout camp', resource: 'Scout_Camp', data: [] },
    { name: 'siege workshop', resource: 'Siege_Workshop', data: [] },
    { name: 'stable', resource: 'Stable', data: [] },
    { name: 'storehouse', resource: 'Storehouse', data: [] },
    { name: 'tavern', resource: 'Tavern', data: [] },
    { name: 'trading post', resource: 'Trading_Post', data: [] },
    { name: 'wall', resource: 'Wall', data: [] },
    { name: 'watchtower', resource: 'Watchtower', data: [] }
  ];

  private static _instance: BuildingsRepository = new BuildingsRepository();

  constructor() {
    if (BuildingsRepository._instance) return BuildingsRepository._instance;

    this._BUILDINGS_METADATA.forEach((build) => {
      try {
        fs.accessSync(path.join(this._jsonPath, `${build.resource}.json`));
      } catch (error) {
        return;
      }
      const data = JSON.parse(fs.readFileSync(path.join(this._jsonPath, `${build.resource}.json`), 'utf-8'));
      
      build.data = data;
    })

    BuildingsRepository._instance = this
  }

  public static getInstance() {
    return this._instance;
  };

  public getBuildingsChoices() {
    return this._BUILDINGS_METADATA.map(data => { return { name: data.name, value: data.name } });
  }

  public findBuildingByLevel(name: string, level: number) {
    const building = this._BUILDINGS_METADATA.filter(data => data.name === name).pop();
    if (!building) return;
    const levelData = building.data[level - 1];
    return levelData;
  }
}