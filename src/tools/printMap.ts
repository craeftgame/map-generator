import {repeatString} from "./repeatString";

export function printMap(map) {

    const b = `+${repeatString('-', (map[0].length * 2) - 1)}+`;

    console.log(b);

    for (let row of map) {
        console.log(`|${row.join('|')}|`);
    }

    console.log(b);
}