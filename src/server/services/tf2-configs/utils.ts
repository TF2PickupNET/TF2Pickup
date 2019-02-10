import { Config } from '.';

export function getNameForConfig(config: Config) {
  return config.configType === null
    ? `${config.region}_${config.gamemode}`
    : `${config.region}_${config.gamemode}_${config.configType}`;
}
