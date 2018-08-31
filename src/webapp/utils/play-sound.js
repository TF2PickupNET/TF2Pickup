// @flow

import store from '../store';
import { announcers } from '../../config';
import { isString } from '../../utils';
import { isNumber } from '../../utils/number';
import { getSettings } from '../store/settings/selectors';

import {
  normalSounds,
  announcerSounds,
  defaultPickupSounds,
} from './sounds';

type Sound = {
  url: string,
  volume: number,
};
type Options = {
  volume?: number,
  announcer?: $Keys<typeof announcers>,
};
type Sounds = $Keys<typeof normalSounds> | $Keys<typeof defaultPickupSounds>;

class Queue {
  items: $ReadOnlyArray<Sound> = [];

  isWorking: boolean = false;

  add(sound: Sound) {
    this.items = [
      ...this.items,
      sound,
    ];
  }

  start() {
    this.isWorking = true;

    this.playSound();
  }

  stop() {
    this.isWorking = false;
  }

  next() {
    if (this.items.length === 0) {
      this.stop();
    } else {
      this.playSound();
    }
  }

  async playSound() {
    const [sound, ...sounds] = this.items;

    this.items = sounds;

    const audio = new Audio(sound.url);

    audio.volume = sound.volume / 100;

    try {
      await audio.play();

      // The duration of the audio is returned as seconds
      const duration = audio.duration * 1000;

      setTimeout(() => {
        this.next();
      }, duration);
    } catch (error) {
      console.error('Error while trying to play audio', error);

      this.next();
    }
  }
}

const queue = new Queue();

function getUrl(sound: Sounds, announcer) {
  switch (sound) {
    case 'afks-kicked':
    case 'countdown':
    case 'game-start':
    case 'ready-up':
    case 'who-not-ready': {
      if (announcerSounds[announcer]) {
        return announcerSounds[announcer][sound];
      }

      return null;
    }
    case 'alert':
    case 'attention':
    case 'notification':
    case 'sound-fix':
    case 'warning': {
      return normalSounds[sound];
    }
    default: return null;
  }
}

function getVolume(volume, settings) {
  if (isNumber(volume)) {
    return volume;
  } else if (settings !== null) {
    return settings.volume;
  }

  return 70;
}

function getAnnouncer(announcer, settings) {
  if (isString(announcer)) {
    return announcer;
  } else if (settings !== null) {
    return settings.announcer;
  }

  return 'default';
}

export default function playSound(
  sound: Sounds,
  options: Options = {},
) {
  const settings = getSettings(store.getState());
  const announcer = getAnnouncer(options.announcer, settings);
  const url = getUrl(sound, announcer);

  if (url === null) {
    console.log(`Couldn't get sound url for: ${sound} ${announcer}`);

    return;
  }

  queue.add({
    url,
    volume: getVolume(options.volume, settings),
  });

  if (!queue.isWorking) {
    queue.start();
  }
}
