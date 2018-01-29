/* eslint-disable global-require, import/no-commonjs */

import {
  flatten,
  map,
  pipe,
  pluck,
  reduce,
} from '@tf2-pickup/utils';

import app from '../app';
import announcers from '../announcers';

const announcerSounds = pipe(
  Object.keys,
  map(announcer => [
    `${announcer}/afkskicked`,
    `${announcer}/countdown`,
    `${announcer}/gamestart`,
    `${announcer}/ready_up`,
    `${announcer}/whonotready`,
  ]),
  flatten,
  reduce((obj, sound) => {
    return {
      ...obj,
      // eslint-disable-next-line import/no-dynamic-require
      [sound]: require(`@tf2-pickup/assets/sounds/pickup/${sound}.mp3`),
    };
  }),
)(announcers);

const sounds = {
  ...announcerSounds,
  notification: require('@tf2-pickup/assets/sounds/notification.mp3'),
  soundFix: require('@tf2-pickup/assets/sounds/notification.mp3'),
  alert: require('@tf2-pickup/assets/sounds/admin/alert.mp3'),
  attention: require('@tf2-pickup/assets/sounds/admin/attention.mp3'),
  warning: require('@tf2-pickup/assets/sounds/admin/warning.mp3'),
};

const getVolume = () => pluck('user.settings.volume')(app.store.getState());

/**
 * Play a sound.
 *
 * @param {String} sound - The name of the sound.
 * @param {Number} [volume] - The volume for the sound. Defaults to the current user volume.
 */
export default function playSound(sound, volume = getVolume()) {
  if (sounds[sound] && volume) {
    const audio = new Audio(sounds[sound]);

    audio.volume = volume / 100;

    audio.addEventListener('canplaythrough', () => {
      audio.play();
    });
  }
}
