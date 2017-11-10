export const def = x => typeof x !== 'undefined';

export const undef = x => typeof x === 'undefined';

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
  if (undef(object)) {
    return null;
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

export const every = fn => ([x, ...xs]) => {
  if (!fn(x) || undef(x)) {
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

export const arrayToObject = key => reduce((obj, item) => {
  return {
    ...obj,
    [item[key]]: item,
  };
}, {});
