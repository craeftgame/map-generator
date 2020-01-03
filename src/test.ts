import {generate} from "./map/generator";

// const map = generate();
// map.print();

const map2 = generate({
    width: 50,
    height: 40,
    pondMax: 10,
    pondChance: 1,
    pondMin: 10
});
map2.print();
