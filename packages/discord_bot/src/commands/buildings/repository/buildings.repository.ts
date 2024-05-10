import path from "path";
import fs from "fs";
export class BuildingsRepository {

  protected  _BUILDINGS_METADATA = [
    { name: 'city hall', jsonFile: path.join(__dirname, 'data', 'City_Hall.json'), data: [] },
    { name: 'academy', jsonFile: path.join(__dirname, 'data', 'Academy.json'), data: [] },
    { name: 'alliance center', jsonFile: path.join(__dirname, 'data', 'Alliance_Center.json'),data: [] },
    { name: 'archery range', jsonFile: path.join(__dirname, 'data', 'Archery_Range.json'), data: [] },
    { name: 'barracks', jsonFile: path.join(__dirname, 'data', 'Barracks.json'), data: [] },
    { name: 'castle', jsonFile: path.join(__dirname, 'data', 'Castle.json'), data: [] },
    { name: 'farm', jsonFile: path.join(__dirname, 'data', 'Farm.json'), data: [] },
    { name: 'goldmine', jsonFile: path.join(__dirname, 'data', 'Goldmine.json'), data: [] },
    { name: 'hospital', jsonFile: path.join(__dirname, 'data', 'Hospital.json'), data: [] },
    { name: 'lumber mill', jsonFile: path.join(__dirname, 'data', 'Lumber_Mill.json'), data: [] },
    { name: 'quarry', jsonFile: path.join(__dirname, 'data', 'Quarry.json'), data: [] },
    { name: 'scout camp', jsonFile: path.join(__dirname, 'data', 'Scout_Camp.json'), data: [] },
    { name: 'siege workshop', jsonFile: path.join(__dirname, 'data', 'Siege_Workshop.json'), data: [] },
    { name: 'stable', jsonFile: path.join(__dirname, 'data', 'Stable.json'), data: [] },
    { name: 'storehouse', jsonFile: path.join(__dirname, 'data', 'Storehouse.json'), data: [] },
    { name: 'tavern', jsonFile: path.join(__dirname, 'data', 'Tavern.json'), data: [] },
    { name: 'trading post', jsonFile: path.join(__dirname, 'data', 'Trading_Post.json'), data: [] },
    { name: 'wall', jsonFile: path.join(__dirname, 'data', 'Wall.json'), data: []},
    { name: 'watchtower', jsonFile: path.join(__dirname, 'data', 'Watchtower.json'), data: [] }
  ];

  private static _instance: BuildingsRepository = new BuildingsRepository();

  constructor () {
    if (BuildingsRepository._instance) return BuildingsRepository._instance;

    this._BUILDINGS_METADATA.forEach((build) => {
      const data = JSON.parse(fs.readFileSync(build.jsonFile, 'utf-8'));
      build.data = data;
    })

    BuildingsRepository._instance = this
  }

  public static getInstance() {
    return this._instance;
  };

  public  getBuildingsChoices() {
    return this._BUILDINGS_METADATA.map(data => data.name);
  }

  public  getLevelChoices() {
    return new Array(25).fill(null).map((_, i) => `${i + 1}`);
  }

  public findBuildingByLevel(name: string, level: number) {
    const building = this._BUILDINGS_METADATA.filter(data => data.name === name).pop();
    return building?.data[level - 1];
  }
}