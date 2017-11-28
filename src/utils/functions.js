export const def = x => typeof x !== 'undefined';

export const undef = x => typeof x === 'undefined';

export const first = ([x]) => x;

export const map = fn => ([x, ...xs]) => {
  if (undef(x)) {
    return [];
  }

  return [fn(x), ...map(fn)(xs)];
};

export const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const reduce = (fn, value) => ([x, ...xs]) => {
  if (undef(x)) {
    return value;
  }

  return reduce(fn, fn(value, x))(xs);
};

// eslint-disable-next-line react-jsdoc/param-tag
/**
 * Flatten arrays.
 *
 * @param {Array} - Multiple arrays to flatten and combine.
 * @returns {Array} - Returns a flattened array.
 */
export const flatten = ([x, ...xs]) => {
  if (undef(x)) {
    return [];
  }

  return [
    ...(Array.isArray(x) ? flatten(x) : [x]),
    ...flatten(xs),
  ];
};

export const pipe = (...fns) => init => reduce((memo, fn) => fn(memo), init)(fns);

export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const pluck = (path, defaultValue = null) => (object) => {
  if (!object) {
    return defaultValue;
  }

  if (path.includes('.')) {
    return pluck(
      path
        .split('.')
        .slice(1)
        .join('.'),
      defaultValue,
    )(object[path.split('.')[0]]);
  } else if (object[path]) {
    return object[path];
  }

  return defaultValue;
};

export const spreadArgs = fn => args => fn(...args);

export const filter = fn => ([x, ...rest]) => {
  if (undef(x)) {
    return [];
  }

  return fn(x) ? [x, ...filter(fn)(rest)] : [...filter(fn)(rest)];
};

export const mapObject = fn => obj => reduce((current, key) => {
  return {
    ...current,
    [key]: fn(obj[key], key),
  };
}, {})(Object.keys(obj));

export const find = fn => ([x, ...xs]) => {
  if (undef(x)) {
    return null;
  }

  return fn(x) ? x : find(fn)(xs);
};

export const findIndex = fn => ([x, ...xs], index = 0) => {
  if (undef(x)) {
    return -1;
  }

  return fn(x) ? index : findIndex(fn)(xs, index + 1);
};

export const add = x => y => x + y;

export const every = fn => ([x, ...xs]) => {
  if (undef(x)) {
    return true;
  }

  if (!fn(x)) {
    return false;
  }

  return every(fn)(xs);
};

export const some = fn => ([x, ...xs]) => {
  if (undef(x)) {
    return false;
  }

  if (fn(x)) {
    return true;
  }

  return some(fn)(xs);
};

export const arrayToObject = fn => reduce((obj, item) => {
  return {
    ...obj,
    [fn(item)]: item,
  };
}, {});

export const omit = (...keys) => obj => pipe(
  Object.keys,
  filter(key => !keys.includes(key)),
  reduce((current, key) => {
    return {
      ...current,
      [key]: obj[key],
    };
  }, {}),
)(obj);

export const assign = (...objs) => obj => Object.assign({}, obj, ...objs);

export const pick = (...keys) => obj => pipe(
  Object.keys,
  filter(key => keys.includes(key)),
  reduce((current, key) => {
    return {
      ...current,
      [key]: obj[key],
    };
  }, {}),
)(obj);
