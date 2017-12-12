/* eslint-disable global-require, import/no-commonjs */

import app from '../app';
import { pluck } from '../../utils/functions';

const sounds = {
  notification: require('../../assets/sounds/notification.mp3'),
  soundFix: require('../../assets/sounds/notification.mp3'),
};

const getVolume = () => pluck('user.settings.volume')(app.store.getState());

/**
 * Play a sound.
 *
 * @param {String} sound - The name of the sound.
 * @param {Number} [volume] - The volume for the sound. Defaults to the current user volume.
 */
export default function playSound(sound, volume = getVolume()) {
  if (sounds[sound]) {
    const audio = new Audio(sounds[sound]);

    audio.volume = volume / 100;

    audio.addEventListener('canplaythrough', () => {
      audio.play();
    });
  }
}
