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
} from '../../../../../utils/functions';
import {
  getPlayers,
  removePlayersFromClasses,
} from '../../../../../utils/pickup';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

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
    totalVotesForMaps,
    filter(mapData => mapData.votes === mostVotes),
    map(pluck('name')),
    pickRandom,
  );
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
  const players = mapObject(pickupQueue.classes, (classPlayers, className) => {
    const min = gamemodes[pickupQueue.gamemode].slots[className];

    return classPlayers
      .filter(player => player.ready)
      .slice(0, min);
  });

  log('Creating pickup');

  try {
    const [
      server,
      teams,
    ] = Promise.all(
      reserveServer(props),
      generateTeams(props, players, pickupQueue.gamemode),
    );

    const lastPickup = await pickupService.Model.aggregate({ $sort: { id: -1 } });
    const pickupId = lastPickup[0] ? lastPickup[0].id + 1 : 1;
    const mapName = getMostVotedMap(
      pickupQueue.maps,
      getPlayers(players),
    );
    const lastPickupForGamemodeAndRegion = await pickupService.find({
      query: {
        region: pickupQueue.region,
        gamemode: pickupQueue.gamemode,
      },
      limit: 1,
      sort: { id: -1 },
    });

    // Create a new pickup
    await pickupService.create({
      id: pickupId,
      teams,
      status: 'setting-up-server',
      map: mapName,
      serverId: server.id,
      logSecret: server.logSecret,
      region: pickupQueue.region,
      gamemode: pickupQueue.gamemode,
    });

    // Remove players from every gamemode queue
    await Promise.all(
      pipe(
        Object.keys,
        map(async (gamemode) => {
          const queue = await pickupQueueService.get(`${pickupQueue.region}-${gamemode}`);

          return pickupQueueService.patch(queue.id, {
            $set: {
              classes: removePlayersFromClasses(
                pipe(
                  getPlayers,
                  map(player => player.id),
                )(players),
              )(queue.classes),
            },
          });
        }),
      )(gamemodes),
    );

    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        maps: generateRandomMaps(pickupQueue.region, pickupQueue.gamemode, [
          map,
          lastPickupForGamemodeAndRegion[0] ? lastPickupForGamemodeAndRegion[0].map : null,
        ]),
      },
    });

    props.app.io.emit('pickup.redirect', {
      pickupId,
      players: pipe(
        getPlayers,
        map(player => player.id),
      )(players),
    });
  } catch (error) {
    // Reset the pickup queue to waiting status
    await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });

    props.app.io.emit('notifications.add', {
      forUsers: getPlayers(players),
      message: error.message,
    });
  }
}
