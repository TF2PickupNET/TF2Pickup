import { mapObject } from '@tf2-pickup/utils';
import { announcers } from '@tf2-pickup/config';

export default mapObject((value, key) => {
  return {
    ...value,
    // eslint-disable-next-line global-require, import/no-dynamic-require
    image: require(`@tf2-pickup/assets/images/announcers/${key}.png`),
  };
})(announcers);
