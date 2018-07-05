// @flow

import { mapValues } from '@tf2pickup/utils';

import maps, { type Map as MapType } from '.';

type Map = MapType & { image: string };

export type { Map };

export default mapValues((key, value) => {
  return {
    ...value,
    // $FlowFixMe: Flow doesn't allow computed requires
    image: require(`../images/${key}.jpg`), // eslint-disable-line import/no-dynamic-require
  };
})(maps);
