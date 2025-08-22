import { TerrainTypes } from "../TerrainTypes";
import { drawLineToSpot } from "../tools/math";
import Map from "./map";

export const generateVoid = (map: Map) => {
  drawLineToSpot(map, 0, 0, map.width - 1, 0, TerrainTypes.Void);

  drawLineToSpot(
    map,
    map.width - 1,
    0,
    map.width - 1,
    map.height - 1,
    TerrainTypes.Void,
  );

  drawLineToSpot(
    map,
    0,
    map.height - 1,
    map.width - 1,
    map.height - 1,
    TerrainTypes.Void,
  );

  drawLineToSpot(map, 0, 0, 0, map.height - 1, TerrainTypes.Void);
};
