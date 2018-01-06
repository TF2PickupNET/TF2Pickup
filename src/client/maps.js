import maps from '../config/maps';
import { mapObject } from '../utils/functions';

export default mapObject((value, key) => {
  return {
    ...value,
    // eslint-disable-next-line
    image: require(`../assets/images/maps/${key}.jpg`),
  };
})(maps);
