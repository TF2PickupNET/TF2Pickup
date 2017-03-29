import gamemodes from '@tf2-pickup/configs/gamemodes';
import classes from '@tf2-pickup/configs/classes';

export default function getAlias(str) {
  const gamemode = Object.values(gamemodes).find(({ aliases }) => aliases.includes(str));
  const className = Object.values(classes).find(({ aliases }) => aliases.includes(str));

  if (gamemode) {
    return gamemode.name;
  } else if (className) {
    return className.name;
  }

  return false;
}
