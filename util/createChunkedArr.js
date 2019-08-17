export default (array, size) => {
  const chunkedArr = [];
  let i = 0;
  while (i < array.length) {
    chunkedArr.push(array.slice(i, size + i));
    i += size;
  }
  return chunkedArr;
};
