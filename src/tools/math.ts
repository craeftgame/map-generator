import {getRandomInt} from "./rand";
import {Point} from "../Interfaces/Point";
import {CircleTypes, TerrainTypes} from "../TerrainTypes";

export function evaluateChance(chance: number): boolean {

    return chance > getRandomInt(0, 1000)
}

export function drawCircleSpot(
    cx, cy, r, a,
    type: CircleTypes
): Point {
    const x = Math.round(cx + (type === CircleTypes.HorizontalEllipse ? 0.5 * r : r) * Math.cos(a));
    const y = Math.round(cy - (type === CircleTypes.VerticalEllipse ? 0.5 * r : r) * Math.sin(a));

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

export function drawLineToSpot(
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
            map.safeWrite(
                x, y,
                type,
            );
        }
    } else {
        for (let y = start.y; y <= end.y; y++) {
            map.safeWrite(
                start.x, y,
                type,
            );
        }
    }

}

export function drawCircle(
    map,
    cx, cy, r: number,
    terrain: TerrainTypes,
    type: CircleTypes,
    fill: boolean
) {
    const spots: Point[] = [];

    // draw circle around
    for (let angle = 0; angle < 360; angle++) {

        const spot = drawCircleSpot(
            cx, cy, r, angle,
            type
        );

        spots.push(spot);

        if (!fill) {
            // write spots
            map.safeWrite(
                spot.x, spot.y,
                terrain
            );
        }
    }

    if (fill) {
        // connect the dots
        for (let spot1 of spots) {
            for (let spot2 of spots) {
                drawLineToSpot(
                    map,
                    spot1.x, spot1.y,
                    spot2.x, spot2.y,
                    terrain
                )
            }
        }
    }
}
