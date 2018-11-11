// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import importAll from 'import-all.macro';

import { announcers } from '../../config';
import alert from '../../../assets/sounds/alert.mp3';
import attention from '../../../assets/sounds/attention.mp3';
import notification from '../../../assets/sounds/notification.mp3';
import soundfix from '../../../assets/sounds/sound-fix.mp3';
import warning from '../../../assets/sounds/warning.mp3';

type PickupSounds = {|
  'afks-kicked': null | string,
  countdown: null | string,
  'game-start': null | string,
  'ready-up': null | string,
  'who-not-ready': null | string,
|};
type AnnouncerSounds = { [key: $Keys<typeof announcers>]: PickupSounds };

const PICKUP_SOUNDS_PATH = '../../../assets/sounds/pickup';
const announcerSoundFiles = importAll.sync(`${PICKUP_SOUNDS_PATH}/*/*.mp3`);

const defaultPickupSounds: PickupSounds = {
  'afks-kicked': null,
  countdown: null,
  'game-start': null,
  'ready-up': null,
  'who-not-ready': null,
};

const normalSounds = {
  alert,
  attention,
  notification,
  'sound-fix': soundfix,
  warning,
};

function getPickupSoundForAnnouncer(announcer) {
  return Object
    .keys(defaultPickupSounds)
    .reduce((sounds, soundName) => {
      const path = announcerSoundFiles[`${PICKUP_SOUNDS_PATH}/${announcer}/${soundName}.mp3`];

      if (!path) {
        console.error(`Missing pickup sound for ${announcer} ${soundName}`);

        return sounds;
      }

      return {
        ...sounds,
        [soundName]: path.default,
      };
    }, defaultPickupSounds);
}

const announcerSounds: AnnouncerSounds = Object
  .keys(announcers)
  .reduce((accu, announcer) => {
    return {
      ...accu,
      [announcer]: getPickupSoundForAnnouncer(announcer),
    };
  }, {});

export type {
  normalSounds,
  defaultPickupSounds,
  announcerSounds,

  PickupSounds,
};
