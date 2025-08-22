import { TerrainTypes } from "../TerrainTypes";
import Map from "./map";

export const generateBackdrop = (map: Map, type: TerrainTypes) => {
  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      map.safeWrite(x, y, type);
    }
  }
};
