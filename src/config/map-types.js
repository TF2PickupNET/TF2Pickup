// @flow

type MapType = {
  name: string,
  display: string,
};

type MapTypes = '5cp' | 'koth' | 'stopwatch' | null;

const mapTypes: { [key: MapTypes]: MapType } = {
  '5cp': {
    name: '5cp',
    display: '5CP',
  },
  koth: {
    name: 'koth',
    display: 'KOTH',
  },
  stopwatch: {
    name: 'stopwatch',
    display: 'Stopwatch',
  },
};

export type {
  MapType,
  MapTypes,
};

export default mapTypes;
