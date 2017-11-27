import pickRandom from 'pick-random';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import { generateRandomMaps } from '../../map-pool';
import {
  pipe,
  map,
  pluck,
  filter,
  spreadArgs,
  mapObject,
  first,
} from '../../../../../utils/functions';
import {
  getPlayers,
  removePlayersFromClasses,
} from '../../../../../utils/pickup';

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
  const playerIds = pipe(
    getPlayers,
    map(player => player.id),
  )(players);

  log('Creating pickup for', pickupQueue.region, pickupQueue.gamemode);

  try {
    // Generate teams
    const teams = await generateTeams(props, players, pickupQueue.gamemode);
    const mapName = getMostVotedMap(
      pickupQueue.maps,
      getPlayers(players),
    );
    const lastPickupForGamemodeAndRegion = await pickupService.find({
      query: {
        region: pickupQueue.region,
        gamemode: pickupQueue.gamemode,

        $limit: 1,
        $sort: { launchedOn: -1 },
      },
    });

    // Create a new pickup
    const pickup = await pickupService.create({
      teams,
      status: 'setting-up-server',
      map: mapName,
      region: pickupQueue.region,
      gamemode: pickupQueue.gamemode,
    });

    log('Created pickup with id', pickup.id);

    // Remove players from every gamemode queue
    await Promise.all(
      pipe(
        Object.keys,
        map(async (gamemode) => {
          const queue = await pickupQueueService.get(`${pickupQueue.region}-${gamemode}`);

          return pickupQueueService.patch(
            queue.id,
            { $set: { classes: removePlayersFromClasses(playerIds)(queue.classes) } },
          );
        }),
      )(gamemodes),
    );

    // Reset the pickup queue to waiting status and generate three new maps
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        maps: generateRandomMaps(pickupQueue.region, pickupQueue.gamemode, [
          mapName,
          lastPickupForGamemodeAndRegion[0] ? lastPickupForGamemodeAndRegion[0].map : null,
        ]),
      },
    });
  } catch (error) {
    // Reset the pickup queue to waiting status
    // await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });

    props.app.io.emit('notifications.add', {
      forUsers: playerIds,
      message: error.message,
    });
  }
}
