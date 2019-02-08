import { useLocation } from '@webapp/utils/use-router';
import gamemodes from '@config/gamemodes';

function useGamemode(): keyof typeof gamemodes {
  const location = useLocation();
  const gamemode = location.pathname.slice(1);

  if (gamemode in gamemodes) {
    return gamemode as keyof typeof gamemodes;
  }

  throw new TypeError('Invalid gamemode extracted from location');
}

export { useGamemode };
