export function repeatString(str, count) {
  let string = String(str);
  // `ToInteger`
  let n = count ? Number(count) : 0;
  if (n != n) {
    // better `isNaN`
    n = 0;
  }
  // Account for out-of-bounds indices
  if (n < 0 || n == Infinity) {
    throw RangeError();
  }
  let result = "";
  while (n) {
    if (n % 2 == 1) {
      result += string;
    }
    if (n > 1) {
      string += string;
    }
    n >>= 1;
  }
  return result;
}
