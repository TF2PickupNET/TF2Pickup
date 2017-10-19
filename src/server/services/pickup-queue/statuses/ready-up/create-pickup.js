import mapValues from 'lodash.mapvalues';
import flatten from 'lodash.flatten';
import pickRandom from 'pick-random';
import get from 'lodash.get';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import { generateRandomMaps } from '../../map-pool';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

function getVotesForMap(map, classes) {
  return Object
    .values(classes)
    .map(players => players.filter(player => player.map === map).length)
    .reduce((current, count) => current + count);
}

function getMostVotedMap(maps, classes) {
  const totalVotesForMaps = maps.map(map => [
    map,
    getVotesForMap(map, classes),
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
    const pickupId = lastPickup[0] ? lastPickup[0].id + 1 : 1;
    const map = getMostVotedMap(pickupQueue.maps, pickupQueue.classes);
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
          classPlayers => classPlayers.filter(player => !players.includes(player.id)),
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
