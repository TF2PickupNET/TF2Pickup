function isFunc(val: any): val is Function {
  return typeof val === 'function';
}

export { isFunc };
