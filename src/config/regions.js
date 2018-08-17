// @flow

type Region = {|
  name: string,
  fullName: string,
  voiceServer: 'mumble' | 'discord',
  service: 'etf2l' | 'ozfortress',
|};

const regions = {
  eu: {
    name: 'eu',
    fullName: 'Europe',
    voiceServer: 'mumble',
    service: 'etf2l',
  },
};

export type { Region };

export default regions;
