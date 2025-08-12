import { generateBackdrop } from "./generateBackdrop";
import { getRandomArrayItem } from "../tools/rand";
import { generatePonds } from "./generatePonds";
import { generateTrees } from "./generateTrees";
import { generateVoid } from "./generateVoid";
import { TerrainTypes } from "../TerrainTypes";
import Map from "./map";

export async function generate({
  height = 30,
  width = 40,
  treeChance = 5.0,
  pondChance = 4.0,
  pondMin = 0,
  pondMax = 3,
} = {}) {
  const map = new Map(width, height);

  generateBackdrop(
    map,
    getRandomArrayItem({
      // todo: add water here to have a water map
      array: [TerrainTypes.Earth],
    }),
  );

  generateVoid(map);

  generatePonds(map, pondChance, pondMin, pondMax);

  generateTrees(map, treeChance);

  map.evaluateSpawn();

  return map;
}
