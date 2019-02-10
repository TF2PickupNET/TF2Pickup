// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NestedArray<Item> extends Array<Item | NestedArray<Item>> {}

function flatten<Item>([x, ...rest]: NestedArray<Item>): Item[] {
  if (rest.length === 0) {
    return Array.isArray(x) ? flatten(x) : [x];
  }

  return [
    ...Array.isArray(x) ? flatten(x) : [x],
    ...flatten(rest),
  ];
}

export {
  flatten,

  NestedArray,
};
