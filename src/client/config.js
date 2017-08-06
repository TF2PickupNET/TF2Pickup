export const isDev = window.location.hostname === 'localhost';

export const titleSuffix = ' | TF2Pickup.net';

export const sounds = {};

export const storageKeys = { lastGamemode: 'lastGamemode' };

export const cdnUrl = '/assets';

export const imageUrl = `${cdnUrl}/images`;

export const soundsUrl = `${cdnUrl}/sounds`;

export const breakpoints = {
  small: [null, 640],
  medium: [641, 1200],
  large: [1201, null],

  getQuery(viewsize) {
    const minWidth = this[viewsize][0] ? `and (min-width: ${this[viewsize][0]}px)` : '';
    const maxWidth = this[viewsize][1] ? `and (max-width: ${this[viewsize][1]}px)` : '';

    return `@media screen ${minWidth} ${maxWidth}`;
  },
};
