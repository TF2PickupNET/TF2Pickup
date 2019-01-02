function mapObjectKeys<Obj, K extends keyof Obj, NewKey extends string>(
  obj: Obj,
  fn: (key: K, val: Obj[K]) => NewKey,
): { [key in NewKey]: Obj[K] } {
  const keys = Object.keys(obj) as Array<K>;

  return keys.reduce((accu, key: K) => {
    return {
      ...accu,
      [fn(key, obj[key])]: obj[key],
    };
  }, {}) as { [key in NewKey]: Obj[K] };
}

function mapObjectValues<Obj, K extends keyof Obj, NewValues>(
  obj: Obj,
  fn: (key: K, val: Obj[K]) => NewValues,
): { [key in K]: NewValues } {
  const keys = Object.keys(obj) as Array<K>;

  return keys.reduce((accu, key: K) => {
    return {
      ...accu,
      [key]: fn(key, obj[key]),
    };
  }, {}) as { [key in K]: NewValues };
}

export {
  mapObjectKeys,
  mapObjectValues,
};
