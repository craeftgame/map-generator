export const getRandomInt = (min, max): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = ({ array, start = 0 }) => {
  const randomIndex = getRandomInt(start, array.length - 1);
  return array[randomIndex];
};

export const getRandomEnumEntry = <T extends { [k: number]: string | number }>({
  en,
  start = 0,
}: {
  en: T;
  start?: number;
}): T[keyof T] => {
  const enumKeys = Object.keys(en)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n));

  const randomIndex = getRandomArrayItem({
    array: enumKeys,
    start,
  });

  return en[randomIndex as keyof T];
};
