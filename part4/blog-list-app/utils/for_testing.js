// const reverse returns the reversed version of the input string. It does this by splitting the string into an array of characters, reversing the order of the characters in the array, and then joining the characters back into a single string.
const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
