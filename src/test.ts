import {generate} from "./map/generator";

(async () => {
    const map = await generate({
        width: 80,
        height: 50,
        pondMax: 4,
        pondChance: 3,
        pondMin: 1
    });
    map.print();
})();
