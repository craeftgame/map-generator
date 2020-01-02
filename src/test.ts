import {printMap} from "./tools/printMap";
import {generate} from "./map/generator";

const map = generate();
printMap(map);


const map2 = generate({
    width: 10,
    height: 5,
});
printMap(map2);
