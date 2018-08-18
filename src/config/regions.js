// @flow

type Region = {|
  name: string,
  fullName: string,
  voiceServer: 'mumble' | 'discord',
  service: 'etf2l' | 'ozfortress',
|};
type Regions = 'eu';

const regions: { [key: Regions]: Region } = {
  eu: {
    name: 'eu',
    fullName: 'Europe',
    voiceServer: 'mumble',
    service: 'etf2l',
  },
};

export type {
  Region,
  Regions,
};

export default regions;
