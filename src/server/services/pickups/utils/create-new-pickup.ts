import { ServerApp } from '@feathersjs/feathers';
import maps from '@config/maps';
import { PickupStates } from '@config/pickup-states';
import regions from '@config/regions';
import gamemodes from '@config/gamemodes';

async function createNewPickup(
  app: ServerApp,
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
  map: keyof typeof maps,
) {
  const pickups = app.service('pickups');

  try {
    const [lastPickup] = await pickups.find({ query: { $sort: { id: 1 } } });

    const pickup = await pickups.create({
      id: lastPickup ? lastPickup.id + 1 : 1,
      map,
      region,
      gamemode,
      state: PickupStates.ReservingServer,
      createdOn: Date.now(),
      startDate: null,
      endDate: null,
    });

    return pickup;
  } catch (error) {
    return null;
  }
}

export default createNewPickup;
