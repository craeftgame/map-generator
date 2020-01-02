import {fillArray} from "../tools/fillArray";

export function generateBackdrop(
    map,
    height, width,
    type
) {
    for (let y = 0; y < height; y++) {
        map[y] = fillArray(
            new Array(width),
            type,
            0,
            width
        )
    }
}