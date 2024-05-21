import { BuildingsRepository } from "../repository/buildings.repository";

export class BuildingsService {

  private static buildingsRepository = BuildingsRepository.getInstance();

  public static getBuildingsChoices() {
    return this.buildingsRepository.getBuildingsChoices();
  }

  public static findBuildingByLevel(name: string, level: number) {
    return this.buildingsRepository.findBuildingByLevel(name, level);
  }
}