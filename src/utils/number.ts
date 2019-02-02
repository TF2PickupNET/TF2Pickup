function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val);
}

export { isNumber };
