module.exports = {
  forEach(arr, fn) {
    for (let el of arr) {
      fn(el);
    }
  },
};
