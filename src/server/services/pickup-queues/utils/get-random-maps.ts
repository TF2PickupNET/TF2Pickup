import maps from '@config/maps';
import mapPool from '@config/map-pool';
import PickupQueue from '@typings/PickupQueue';

function getRandomMaps(
  queueId: string,
  lastMap: keyof typeof maps | null,
) {
  const pool = mapPool[queueId];

  if (!pool) {
    throw new TypeError('Map pool for ');
  }

  const newMaps: PickupQueue['maps'] = [];

  while (newMaps.length < 3) {
    const index = Math.round(Math.random() * (pool.length - 1));
    const map = pool[index];

    if (map !== lastMap && !newMaps.includes(map)) {
      newMaps.push(map);
    }
  }

  return newMaps;
}

export default getRandomMaps;
