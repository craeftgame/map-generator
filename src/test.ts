import {generate} from "./map/generator";

const map = generate({
    width: 50,
    height: 50,
    pondMax: 4,
    pondChance: 3,
    pondMin: 1
});
map.print();
