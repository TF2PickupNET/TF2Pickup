import SteamCommunity from 'steamcommunity';
import { promisify } from 'util';
import debug from 'debug';
import config from 'config';

const log = debug('TF2Pickup:utils:steam-community');
const steamCommunity = new SteamCommunity();
const login = promisify(steamCommunity.login.bind(steamCommunity));
const username = config.get<string | null>('services.steam.username');
const password = config.get<string | null>('services.steam.password');

export async function setupSteam() {
  if (password === null || username === null) {
    return;
  }

  try {
    await login({
      accountName: username,
      password,
    });

    log('Successfully logged into steam');
  } catch (error) {
    log('Error while logging into steam', { error });
  }
}

export default steamCommunity;
