export function arrayToText(array) {
  return array.reduce((str, currentValue, currentIndex) => {
    const isLastItem = array.length - 1 === currentIndex;

    return `${str}${isLastItem ? ' and' : ','} ${currentValue}`;
  }).trim();
}
