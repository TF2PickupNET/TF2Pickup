import pickRandom from 'pick-random';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import { generateRandomMaps } from '../../../../../config/map-pool';
import {
  pipe,
  map,
  pluck,
  filter,
  spreadArgs,
  mapObject,
  first,
  assign,
} from '../../../../../utils/functions';
import { getPlayers } from '../../../../../utils/pickup-queue';

import generateTeams from './generate-teams';

const log = debug('TF2Pickup:pickup-queue:statuses:create-pickup');

/**
 * Get the most voted map by the players.
 *
 * @param {String[]} maps - The map selection.
 * @param {Object[]} players - The players for the pickup.
 * @returns {String} - Returns the most voted map.
 */
function getMostVotedMap(maps, players) {
  const totalVotesForMaps = map((mapName) => {
    return {
      name: mapName,
      votes: filter(player => player.map === mapName)(players).length,
    };
  })(maps);
  const mostVotes = pipe(
    map(mapData => mapData.votes),
    spreadArgs(Math.max),
  )(totalVotesForMaps);

  return pipe(
    filter(mapData => mapData.votes === mostVotes),
    map(pluck('name')),
    pickRandom,
    first,
  )(totalVotesForMaps);
}

/**
 * Create a new pickup when enough players are ready.
 *
 * @param {Object} props - The props from the hook.
 */
export default async function createPickup(props) {
  const pickupQueue = props.result;
  const pickupService = props.app.service('pickup');
  const pickupQueueService = props.app.service('pickup-queue');
  // Get the players for the pickup
  const players = mapObject((classPlayers, className) => {
    const min = gamemodes[pickupQueue.gamemode].slots[className];

    return classPlayers
      .filter(player => player.ready)
      .slice(0, min);
  })(pickupQueue.classes);

  log('Creating pickup for', pickupQueue.region, pickupQueue.gamemode);

  try {
    // Generate teams
    const teams = await generateTeams(props, players, pickupQueue.gamemode);
    const mapName = getMostVotedMap(
      pickupQueue.maps,
      getPlayers({ classes: players }),
    );
    const lastPickupForGamemodeAndRegion = await pickupService.find({
      query: {
        region: pickupQueue.region,
        gamemode: pickupQueue.gamemode,

        $limit: 1,
        $sort: { id: -1 },
      },
    });

    // Create a new pickup
    const pickup = await pickupService.create({
      teams,
      map: mapName,
      region: pickupQueue.region,
      gamemode: pickupQueue.gamemode,
    });

    log('Created pickup with id', pickup.id);

    // Reset the pickup queue to waiting status and generate three new maps
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        classes: mapObject(map(player => assign(player, { ready: false })))(pickupQueue.classes),
        maps: generateRandomMaps(pickupQueue.region, pickupQueue.gamemode, [
          mapName,
          lastPickupForGamemodeAndRegion[0] ? lastPickupForGamemodeAndRegion[0].map : null,
        ]),
      },
    });
  } catch (error) {
    log('Error in pickup creation', error);
    // Reset the pickup queue to waiting status
    // await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });
  }
}
