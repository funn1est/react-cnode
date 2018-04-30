export const splitArray = (array, size) => {
  const result = [];
  const len = array.length;
  for (let i = 0; i < len; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
