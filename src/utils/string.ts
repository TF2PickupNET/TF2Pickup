function isString(val: unknown): val is string {
  return typeof val === 'string';
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export { isString, capitalize };
