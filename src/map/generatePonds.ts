import {CircleTypes, TerrainTypes} from "../TerrainTypes";
import {drawCircle, evaluateChance} from "../tools/math";
import {getRandomArrayItem, getRandomEnumEntry, getRandomInt} from "../tools/rand";
import Map from "./map";
import {getRandomObjectEntry} from "../../../engine/src/tools/rand";

export function generatePonds(
    map: Map,
    chance: number,
    min: number,
    max: number
) {
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {

            // can only put pond on soil
            if (map.getAt(x, y).terrain === TerrainTypes.Earth) {
                if (evaluateChance(chance)) {

                    const type: CircleTypes = CircleTypes[getRandomEnumEntry({
                        en: CircleTypes
                    })] as unknown as CircleTypes;

                    console.log(type);

                    drawCircle(
                        map,
                        x,
                        y,
                        getRandomInt(min, max),
                        TerrainTypes.Water,
                        type,
                        true
                    )
                }
            }
        }
    }
}