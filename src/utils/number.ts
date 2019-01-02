function isNumber(val: any): val is number {
  return typeof val === 'number' && !isNaN(val);
}

export { isNumber };
