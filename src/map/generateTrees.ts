import {TerrainTypes} from "../TerrainTypes";
import {evaluateChance} from "../tools/math";
import {safeWrite} from "./safeWrite";

export function generateTrees(map, chance) {

    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {

            // can only plant tree on soil
            if (map[y][x] === TerrainTypes.Earth) {
                if (evaluateChance(chance)) {
                    safeWrite(
                        map,
                        x, y,
                        TerrainTypes.Tree
                    );
                }
            }
        }
    }
}