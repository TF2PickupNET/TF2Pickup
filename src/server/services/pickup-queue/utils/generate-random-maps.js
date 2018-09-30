// @flow

import { mapPool } from '../../../../config';

export function getRandomItems(array: $ReadOnlyArray<string>, amount) {
  if (array.length === amount) {
    return array;
  }

  const index = Math.floor(Math.random() * array.length);
  const selectedItem = array[index];

  return [
    selectedItem,
    ...getRandomItems(
      array.filter(item => item !== selectedItem),
      amount,
    ),
  ];
}

export default function generateRandomMaps(pickupQueue, lastPickup) {
  const maps = mapPool[pickupQueue.id];
  const filteredMaps = maps.filter(map => map !== lastPickup.map);

  return getRandomItems(filteredMaps, 3);
}

