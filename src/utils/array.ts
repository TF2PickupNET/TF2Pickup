function flatten<T>([x, ...rest]: T[]): T[] {
  if (typeof x === 'undefined') {
    return [];
  }

  if (rest.length === 0) {
    return Array.isArray(x) ? flatten(x) : [x];
  }

  return [
    ...(Array.isArray(x) ? flatten(x) : [x]),
    ...flatten(rest),
  ];
}

export { flatten };
