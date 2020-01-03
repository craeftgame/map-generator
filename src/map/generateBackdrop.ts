import {fillArray} from "../tools/fillArray";
import Map from "./map";
import {TerrainTypes} from "../TerrainTypes";

export function generateBackdrop(
    map: Map,
    type: TerrainTypes
) {
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {

            map.safeWrite(
                x, y,
                type
            )
        }
    }
}