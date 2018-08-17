// @flow

/**
 * Map over an object and return the new key value combination.
 *
 * @param {(key, value) => [key, value]} fn - The iterator function.
 * @returns {Object} - Returns the new object.
 */
function mapObject<K: string, V>(fn: (key: K, value: V) => [K, V]) {
  return (obj: { [key: K]: V }) => Object
    .keys(obj)
    .reduce((accu, key) => {
      const [newKey, newValue] = fn(key, obj[key]);

      return {
        ...accu,
        [newKey]: newValue,
      };
    }, {});
}

/**
 * Map over the keys of an object and return the new key for the value.
 *
 * @param {(key, value) => value} fn - The iterator function.
 * @returns {Object} - Returns the new object.
 */
function mapKeys<K: string, V>(fn: (key: K, value: V) => K) {
  return mapObject((key, value) => [
    fn(key, value),
    value,
  ]);
}

/**
 * Map over the values of an object and return the new value.
 *
 * @param {(key, value) => string} fn - The iterator function.
 * @returns {(Object) => Object} - Returns the new object.
 */
function mapValues<K: string, V>(fn: (key: K, value: V) => V) {
  return mapObject((key, value) => [
    key,
    fn(key, value),
  ]);
}

/**
 * Filter an object.
 *
 * @param {(key: String, value) => Boolean} fn - The function which decides to keep or remove the
 * key value pair.
 * @returns {obj => obj} - Returns a function which will return the filtered object.
 */
function filterObject<K: string, V>(fn: (key: K, value: V) => boolean) {
  return (obj: { [key: K]: V }) => Object
    .keys(obj)
    .filter(key => fn(key, obj[key]))
    .reduce((accu, key) => {
      return {
        ...accu,
        [key]: obj[key],
      };
    }, {});
}

/**
 * Omit certain keys from an object.
 *
 * @param {...String} keys - The keys to omit from the function.
 * @returns {}
 */
function omit(...keys: $ReadOnlyArray<string>) {
  return filterObject(key => !keys.includes(key));
}

function pick(...keys: $ReadOnlyArray<string>) {
  return filterObject(key => keys.includes(key));
}

export {
  mapObject,
  mapKeys,
  mapValues,
  filterObject,
  omit,
  pick,
};