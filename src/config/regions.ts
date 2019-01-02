type VoiceServers = 'mumble' | 'discord';
type Services = 'etf2l' | 'ozfortress';

interface Region {
  name: string,
  fullName: string,
  voiceServer: VoiceServers,
  service: Services,
}

const eu: Region = {
  name: 'eu',
  fullName: 'Europe',
  voiceServer: 'mumble',
  service: 'etf2l',
};

const regions = { eu };

export {
  Region,
  VoiceServers,
  Services,
};

export default regions;
