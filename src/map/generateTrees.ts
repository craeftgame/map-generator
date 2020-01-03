import {TerrainTypes} from "../TerrainTypes";
import {evaluateChance} from "../tools/math";
import Map from "./map";

export function generateTrees(
    map: Map,
    chance: number
) {
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {

            // can only plant tree on soil
            if (map.getAt(x, y).terrain === TerrainTypes.Earth) {
                if (evaluateChance(chance)) {
                    map.safeWrite(
                        x, y,
                        TerrainTypes.Tree
                    );
                }
            }
        }
    }
}