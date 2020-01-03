import {fillArray} from "../tools/fillArray";
import Map from "./map";
import {TerrainTypes} from "../TerrainTypes";
import {drawLineToSpot} from "../tools/math";

export function generateVoid(
    map: Map
) {
    drawLineToSpot(
        map,
        0, 0, map.width - 1, 0,
        TerrainTypes.Void
    );

    drawLineToSpot(
        map,
        map.width - 1, 0, map.width - 1, map.height - 1,
        TerrainTypes.Void
    );

    drawLineToSpot(
        map,
        0, map.height - 1, map.width - 1, map.height - 1,
        TerrainTypes.Void
    );

    drawLineToSpot(
        map,
        0, 0, 0, map.height - 1,
        TerrainTypes.Void
    );
}