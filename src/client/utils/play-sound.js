import app from '../app';
import { pluck } from '../../utils/functions';

const sounds = {
  notification: require('../../assets/sounds/notification.mp3'),
  soundFix: require('../../assets/sounds/notification.mp3'),
};

const getVolume = () => pluck('user.settings.volume')(app.store.getState());

export default function playSound(sound, volume = getVolume()) {
  if (sounds[sound]) {
    const audio = new Audio(sounds[sound]);

    audio.volume = volume / 100;

    audio.addEventListener('canplaythrough', () => {
      audio.play();
    });
  }
}
