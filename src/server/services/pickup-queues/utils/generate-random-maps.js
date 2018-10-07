// @flow

import { mapPool } from '../../../../config';

export function getRandomItems(array: $ReadOnlyArray<string>, amount: number) {
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

export default function generateRandomMaps(pickupId: string, lastPickup: { map: string } | null) {
  const maps = mapPool[pickupId];

  return getRandomItems(
    lastPickup === null ? maps : maps.filter(map => map !== lastPickup.map),
    3,
  );
}

