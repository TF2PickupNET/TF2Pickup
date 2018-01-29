import is from 'is_js';
import SteamID from 'steamid';

/**
 * Create a mongoose validator for an url.
 *
 * @param {Object} options - Options for the rule.
 * @param {String} [options.msg] - The error message for the validator.
 * @param {Boolean} [options.nullIsAllowed] - Whether or not the value 'null' is allowed.
 * @returns {Array} - Returns the validator for mongoose.
 */
export function url({
  msg = '{VALUE} is not a valid url!',
  nullIsAllowed = false,
}) {
  return [
    value => is.url(value) || (nullIsAllowed && value === null),
    msg,
  ];
}

/**
 * Create a mongoose validator for a steam id.
 *
 * @param {Object} options - Options for the rule.
 * @param {String} [options.msg] - The error message for the validator.
 * @param {Boolean} [options.nullIsAllowed] - Whether or not the value 'null' is allowed.
 * @returns {Array} - Returns the validator for mongoose.
 */
export function steamId({
  msg = '{VALUE} is not a valid Steam ID!',
  nullIsAllowed = false,
}) {
  return [
    id => new SteamID(id).isValid() || (nullIsAllowed && id === null),
    msg,
  ];
}

/**
 * Create a mongoose validator for an url.
 *
 * @param {Array} array - The array to check in.
 * @param {Object} options - Options for the rule.
 * @param {String} [options.msg] - The error message for the validator.
 * @param {Boolean} [options.nullIsAllowed] - Whether or not the value 'null' is allowed.
 * @returns {Array} - Returns the validator for mongoose.
 */
export function isInArray(array, {
  msg = '{VALUE} is not in the Array!',
  nullIsAllowed = false,
}) {
  return [
    value => array.includes(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
