import {getRandomInt} from "./rand";
import {Point} from "../Interfaces/Point";
import {TerrainTypes} from "../TerrainTypes";
import {safeWrite} from "../map/safeWrite";

export function evaluateChance(chance: number): boolean {

    return chance > getRandomInt(0, 1000)
}

export function drawCircleSpot(cx, cy, r, a) {
    const x = Math.round(cx + r * Math.cos(a));
    const y = Math.round(cy + r * Math.sin(a));

    return {
        x, y
    }
}

function intercept(point, slope: number | null) {
    if (slope === null) {
        // vertical line
        return point.x;
    }

    return point.y - slope * point.x;
}

function slope(
    a: Point,
    b: Point
): number | null {
    if (a.x === b.x) {
        return null;
    }

    return (b.y - a.y) / (b.x - a.x);
}

function drawLineToSpot(
    map,
    // start
    sx, sy,
    // end
    ex, ey,
    type: TerrainTypes
) {
    const start = {x: sx, y: sy};
    const end = {x: ex, y: ey};

    const m = slope(start, end);
    const b = intercept(start, m);

    if (m !== null) {
        for (let x = start.x; x <= end.x; x++) {
            const y = Math.round(m * x + b);
            safeWrite(
                map,
                x, y,
                type,
            );
        }
    } else {
        for (let y = start.y; y <= end.y; y++) {
            safeWrite(
                map,
                start.x, y,
                type,
            );
        }
    }

}

export function drawCircle(
    map,
    cx, cy, r: number,
    type: TerrainTypes,
    fill: boolean
) {
    // draw circle around
    for (let angle = 0; angle < 360; angle++) {

        const spot = drawCircleSpot(cx, cy, r, angle);

        // write spots
        safeWrite(
            map,
            spot.x, spot.y,
            type
        );

        if (fill) {
            drawLineToSpot(
                map,
                spot.x, spot.y,
                cx, cy,
                type
            );
            drawLineToSpot(
                map,
                cx, cy,
                spot.x, spot.y,
                type
            )
        }
    }
}
