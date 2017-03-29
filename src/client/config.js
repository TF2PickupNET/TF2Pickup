import { cdnUrl as prodCdnUrl } from '@tf2-pickup/configs/utils';

export const isDev = window.location.hostname === 'localhost';

export const titleSuffix = ' | TF2Pickup.net';

export const sounds = {};

export const storageKeys = { lastGamemode: 'lastGamemode' };

export const cdnUrl = isDev ? '/assets' : prodCdnUrl;
