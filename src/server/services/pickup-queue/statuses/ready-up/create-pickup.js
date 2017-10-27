import mapValues from 'lodash.mapvalues';
import flatten from 'lodash.flatten';
import pickRandom from 'pick-random';
import get from 'lodash.get';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import { generateRandomMaps } from '../../map-pool';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

/**
 * Remove the players from the queue.
 *
 * @param {Object} players - The players from the new pickup.
 * @returns {Function} - A function which will modify the queue and remove the players.
 */
function removePlayersFromQueue(players) {
  return classPlayers => classPlayers.filter(({ id }) => !players.includes(id));
}

/**
 * Get the most voted map by the players.
 *
 * @param {String[]} maps - The map selection.
 * @param {Object[]} players - The players for the pickup.
 * @returns {String} - Returns the most voted map.
 */
function getMostVotedMap(maps, players) {
  const totalVotesForMaps = maps.map((map) => {
    return {
      name: map,
      votes: players.filter(player => player.map === map).length,
    };
  });
  const mostVotes = Math.max(...totalVotesForMaps.map(map => map.votes));

  return pickRandom(
    totalVotesForMaps
      .filter(map => map.votes === mostVotes)
      .map(map => map.name),
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
  const players = mapValues(pickupQueue.classes, (classPlayers, className) => {
    const min = gamemodes[pickupQueue.gamemode].slots[className];

    return classPlayers
      .filter(player => player.ready)
      .slice(0, min);
  });
  const allPlayers = flatten(Object.values(players)).map(player => player.id);

  try {
    const server = {
      id: 123,
      logSecret: 123,
    };

    const teams = await generateTeams(pickupQueue, players);

    const lastPickup = await pickupService.Model.aggregate({ $sort: { id: -1 } });
    const pickupId = get(lastPickup, '[0].id', 0) + 1;
    const map = getMostVotedMap(
      pickupQueue.maps,
      flatten(Object.values(players)),
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
      map,
      serverId: server.id,
      logSecret: server.logSecret,
      region: pickupQueue.region,
      gamemode: pickupQueue.gamemode,
    });

    // Remove players from every gamemode
    await Promise.all(
      Object
        .keys(gamemodes)
        .map(async (gamemode) => {
          const queue = await pickupQueueService.get(`${pickupQueue.region}-${gamemode}`);

          return pickupQueueService.patch(queue.id, {
            $set: {
              classes: mapValues(
                queue.classes,
                removePlayersFromQueue(allPlayers),
              ),
            },
          });
        }),
    );

    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        maps: generateRandomMaps(pickupQueue.region, pickupQueue.gamemode, [
          map,
          get(lastPickupForGamemodeAndRegion, '[0].map', null),
        ]),
      },
    });

    props.app.io.emit('pickup.redirect', {
      pickupId,
      players: flatten(Object.values(players)),
    });
  } catch (error) {
    // Reset the pickup queue to waiting status
    await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });

    props.app.io.emit('notifications.add', {
      forUsers: flatten(Object.values(players)),
      message: error.message,
    });
  }
}
