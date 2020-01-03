export function getRandomInt(
    min,
    max
): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayItem(
    {
        array,
        start = 0
    }
) {
    const randomIndex = getRandomInt(start, array.length - 1);
    return array[randomIndex]
}

export function getRandomEnumEntry(
    {
        en,
        start = 0
    }
): any {
    const enumKeys = Object.keys(en)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n));

    const randomIndex = getRandomArrayItem({
        array: enumKeys,
        start
    });

    return en[randomIndex];
}