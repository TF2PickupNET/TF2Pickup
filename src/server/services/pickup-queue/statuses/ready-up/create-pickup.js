import mapValues from 'lodash.mapvalues';
import flatten from 'lodash.flatten';
import pickRandom from 'pick-random';
import get from 'lodash.get';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import { generateRandomMaps } from '../../map-pool';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

/**
 * Get the most voted map by the players.
 *
 * @param {String[]} maps - The map selection.
 * @param {Object[]} players - The players for the pickup.
 * @returns {String} - Returns the most voted map.
 */
function getMostVotedMap(maps, players) {
  const totalVotesForMaps = maps.map(map => [
    map,
    players.filter(player => player.map === map).length,
  ]);
  const mostVotes = totalVotesForMaps.reduce((current, map) => {
    if (current.votes < map[1]) {
      return {
        votes: map[1],
        maps: [map[0]],
      };
    } else if (current.votes === map[1]) {
      return {
        votes: map[1],
        maps: current.maps.concat([map[0]]),
      };
    }

    return current;
  }, {
    votes: 0,
    maps: [],
  });

  return pickRandom(mostVotes.maps);
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

  try {
    const [
      server,
      teams,
    ] = Promise.all(
      reserveServer(props),
      generateTeams(players),
    );

    const lastPickup = await pickupService.find({
      limit: 1,
      sort: { id: -1 },
    });
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
    });

    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        classes: mapValues(
          pickupQueue.classes,
          classPlayers => classPlayers.filter((player) => {
            for (let index = 0; index < players.length; index += 1) {
              if (players[index].id === player.id) {
                return true;
              }
            }

            return false;
          }),
        ),
        maps: generateRandomMaps(pickupQueue.region, pickupQueue.gamemode, [
          map,
          get(lastPickupForGamemodeAndRegion, '[0].map', null),
        ]),
      },
    });

    props.app.io.emit('pickup.redirect', {
      pickupId,
      players,
    });
  } catch (error) {
    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });

    props.app.io.emit('notifications.add', {
      forUsers: flatten(Object.values(players)),
      message: error.message,
    });
  }
}
