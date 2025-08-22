export const fillArray = (
  array: (string | number)[],
  value: string | number,
  start: number = 0,
  end: number = 0,
) => {
  if (!Array.isArray(array)) {
    throw new TypeError("array is not an Array");
  }

  const length = array.length;

  let i;
  let l;

  if (start < 0) {
    i = Math.max(length + start, 0);
  } else {
    i = Math.min(start, length);
  }

  if (end < 0) {
    l = Math.max(length + end, 0);
  } else {
    l = Math.min(end, length);
  }

  for (; i < l; i++) {
    array[i] = value;
  }

  return array;
};
