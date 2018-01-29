import { mapPool } from '@tf2-pickup/config';
import { filter } from '@tf2-pickup/utils';
import pickRandom from 'pick-random';

/**
 * Generate 3 random maps.
 *
 * @param {String} region - The region for which the maps are.
 * @param {String} gamemode - The gamemode for which the maps are.
 * @param {String[]} excludedMaps - An array of map names to exclude.
 * @returns {String[]} - Returns an array with 3 map names.
 */
export default function generateRandomMaps(region, gamemode, excludedMaps) {
  const maps = mapPool[region][gamemode];
  const filteredMaps = filter(mapName => !excludedMaps.includes(mapName))(maps);

  return pickRandom(filteredMaps, { count: 3 });
}
