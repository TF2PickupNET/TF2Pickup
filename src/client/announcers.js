import announcers from '../config/announcers';
import { mapObject } from '../utils/functions';

export default mapObject((value, key) => {
  return {
    ...value,
    // eslint-disable-next-line global-require, import/no-dynamic-require
    image: require(`../assets/images/announcers/${key}.png`),
  };
})(announcers);
