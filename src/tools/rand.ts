export function getRandomInt(
    min,
    max
): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayItem({
                                       array,
                                       start = 0
                                   }) {
    const randomIndex = getRandomInt(start, array.length - 1);
    return array[randomIndex]
}