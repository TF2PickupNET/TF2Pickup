function mapObjectKeys<Obj, Key extends keyof Obj, NewKey extends string>(
  obj: Obj,
  fn: (key: Key, val: Obj[Key]) => NewKey,
) {
  const keys = Object.keys(obj) as Key[];

  return keys.reduce<object>((accu, key: Key) => {
    return {
      ...accu,
      [fn(key, obj[key])]: obj[key],
    };
  }, {}) as Record<NewKey, Obj[Key]>;
}

function mapObjectValues<Obj, Key extends keyof Obj, NewValues>(
  obj: Obj,
  fn: (key: Key, val: Obj[Key]) => NewValues,
) {
  const keys = Object.keys(obj) as Key[];

  return keys.reduce<object>((accu, key: Key) => {
    return {
      ...accu,
      [key]: fn(key, obj[key]),
    };
  }, {}) as Record<Key, NewValues>;
}

function isObject(val: unknown): val is object {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export {
  mapObjectKeys,
  isObject,
  mapObjectValues,
};
