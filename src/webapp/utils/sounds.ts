import alert from '../../../assets/sounds/alert.mp3';
import attention from '../../../assets/sounds/attention.mp3';
import notification from '../../../assets/sounds/notification.mp3';
import soundfix from '../../../assets/sounds/sound-fix.mp3';
import warning from '../../../assets/sounds/warning.mp3';

interface PickupSounds {
  'afks-kicked': null | string,
  countdown: null | string,
  'game-start': null | string,
  'ready-up': null | string,
  'who-not-ready': null | string,
}

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

export {
  PickupSounds,
  normalSounds,
  defaultPickupSounds,
};
