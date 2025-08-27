import crypto from "crypto";

export const secureRandom = (): number => {
  let cryptoObj: Crypto;

  if (typeof window !== "undefined") {
    cryptoObj = window.crypto || (window as any).msCrypto;
  } else {
    cryptoObj = crypto as Crypto;
  }

  const array = new Uint32Array(1);
  cryptoObj.getRandomValues(array);

  // Convert 32-bit unsigned int to a float in [0, 1)
  return array[0] / (0xffffffff + 1);
};

export const getRandomInt = (min, max): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(secureRandom() * (max - min + 1)) + min;
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
