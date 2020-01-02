import {generateBackdrop} from "./generateBackdrop";
import {getRandomArrayItem} from "../tools/rand";
import {TerrainTypes} from "../TerrainTypes";
import {generatePonds} from "./generatePonds";
import {generateTrees} from "./generateTrees";

export function generate(
    {
        height = 30,
        width = 40,
        treeChance = 5.0,
        pondChance = 4.0,
        pondMin = 0,
        pondMax = 3,
    } = {}
) {

    const map: any[][] = [];

    generateBackdrop(
        map,
        height,
        width,
        getRandomArrayItem({
            // add water here to have a water map
            array: [TerrainTypes.Earth]
        })
    );

    generatePonds(
        map,
        pondChance,
        pondMin,
        pondMax
    );

    generateTrees(
        map,
        treeChance
    );

    return map;
}
