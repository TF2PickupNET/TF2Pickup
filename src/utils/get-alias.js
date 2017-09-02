import gamemodes from '@tf2-pickup/configs/gamemodes';

import classes from '@tf2-pickup/configs/classes';

/**
 * Check if a string is an alias for either a gamemode or a class.
 *
 * @param {String} str -  The string to check.
 * @returns {String} - Returns either the aliased name or the string if it's not an alias.
 */
export default function getAlias(str) {
  const gamemode = Object.values(gamemodes).find(({ aliases }) => aliases.includes(str));
  const className = Object.values(classes).find(({ aliases }) => aliases.includes(str));

  if (gamemode) {
    return gamemode.name;
  } else if (className) {
    return className.name;
  }

  return str;
}
