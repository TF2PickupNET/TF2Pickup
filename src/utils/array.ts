function flatten<Item>([x, ...rest]: Item[]): Item[] {
  if (typeof x === 'undefined') {
    return [];
  }

  if (rest.length === 0) {
    return Array.isArray(x) ? flatten(x) : [x];
  }

  return [
    ...Array.isArray(x) ? flatten(x) : [x],
    ...flatten(rest),
  ];
}

export { flatten };
