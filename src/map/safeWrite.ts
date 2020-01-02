import {TerrainTypes} from "../TerrainTypes";

export function safeWrite(
    map,
    x, y,
    type: TerrainTypes,
    verbose: Boolean = false
) {

    if (
        x < 0 || x > map[0].length - 1 ||
        y < 0 || y > map.length - 1
    ) {
        return
    }

    if (verbose) {
        console.log('writing', x, y)
    }

    map[y][x] = type
}