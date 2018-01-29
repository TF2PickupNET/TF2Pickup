import { mapObject } from '@tf2-pickup/utils';

import maps from './';

export default mapObject((value, key) => {
  return {
    ...value,
    // eslint-disable-next-line
    image: require(`../images/${key}.jpg`),
  };
})(maps);
