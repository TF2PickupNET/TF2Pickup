interface SocialMedia {
  name: string,
  display: string,
  icon: string,
  url: string,

  urls?: { [key: string]: string },
}

const discord: SocialMedia = {
  name: 'discord',
  display: 'Discord',
  url: 'https://discord.gg/0ZFcGPZMQIfGVDgA',
  icon: 'discord',

  urls: {
    invite: 'https://discord.gg/nPZmBFt',
    help: 'https://discordapp.com/channels/101790253651599360/101807927752409088',
    suggestions: 'https://discordapp.com/channels/101790253651599360/141602413952892928',
  },
};

const github: SocialMedia = {
  name: 'github',
  display: 'GitHub',
  url: 'https://github.com/TF2PickupNET',
  icon: 'github-circle',
};

const steam: SocialMedia = {
  name: 'steam',
  display: 'Steam',
  url: 'http://steamcommunity.com/groups/TF2PickupNET',
  icon: 'steam',
};

const twitch: SocialMedia = {
  name: 'twitch',
  display: 'Twitch',
  url: 'https://www.twitch.tv/tf2pickup',
  icon: 'twitch',
};

const twitter: SocialMedia = {
  name: 'twitter',
  display: 'Twitter',
  url: 'https://twitter.com/TF2Pickup',
  icon: 'twitter',
};

const socialMedias = {
  steam,
  discord,
  twitter,
  twitch,
  github,
};

export { SocialMedia };

export default socialMedias;
