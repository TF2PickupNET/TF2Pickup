export function randomString(length = 16) {
  return Math
    .random()
    .toString(36)
    .substr(2, length);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function arrayToText(array) {
  return array.reduce((str, currentValue, currentIndex) => {
    const isLastItem = array.length - 1 === currentIndex;

    return `${str}${isLastItem ? ' and' : ','} ${currentValue}`;
  }).trim();
}
