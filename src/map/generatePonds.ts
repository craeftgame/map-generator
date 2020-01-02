import {TerrainTypes} from "../TerrainTypes";
import {drawCircle, evaluateChance} from "../tools/math";
import {getRandomInt} from "../tools/rand";

export function generatePonds(
    map,
    chance,
    min,
    max
) {
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {

            // can only put pond on soil
            if (map[y][x] === TerrainTypes.Earth) {
                if (evaluateChance(chance)) {

                    drawCircle(
                        map,
                        x,
                        y,
                        getRandomInt(min, max),
                        TerrainTypes.Water,
                        true
                    )
                }
            }
        }
    }
}