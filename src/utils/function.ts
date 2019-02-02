function isFunc(val: unknown): val is Function {
  return typeof val === 'function';
}

export { isFunc };
