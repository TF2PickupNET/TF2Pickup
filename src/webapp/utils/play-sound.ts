import store from '../store';
import announcers from '../../config/announcers';
import { isString } from '../../utils/string';
import { isNumber } from '../../utils/number';
import { getSettings } from '../store/settings/selectors';
import sleep from 'sleep-promise';

import {
  normalSounds,
  defaultPickupSounds,
} from './sounds';
import UserSettings from "../../types/UserSettings";

interface Sound {
  url: string,
  volume: number,
}

interface Options {
  volume?: number,
  announcer?: keyof typeof announcers,
}

type Sounds = keyof typeof normalSounds | keyof typeof defaultPickupSounds;

class Queue {
  items: Sound[] = [];

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

      await sleep(duration);
    } catch (error) {
      console.error('Error while trying to play audio', error);
    }

    this.next();
  }
}

const queue = new Queue();

function getUrl(sound: Sounds, announcer?: keyof typeof announcers) {
  switch (sound) {
    case 'afks-kicked':
    case 'countdown':
    case 'game-start':
    case 'ready-up':
    case 'who-not-ready': {
      return announcer || null;
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

function getVolume(settings: UserSettings | null, volume?: number) {
  if (isNumber(volume)) {
    return volume;
  } else if (settings !== null) {
    return settings.volume;
  }

  return 70;
}

function getAnnouncer(settings: UserSettings | null, announcer?: keyof typeof announcers) {
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
  const announcer = getAnnouncer(settings, options.announcer);
  const url = getUrl(sound, announcer);

  if (url === null) {
    console.log(`Couldn't get sound url for: ${sound} ${announcer}`);

    return;
  }

  queue.add({
    url,
    volume: getVolume(settings, options.volume),
  });

  if (!queue.isWorking) {
    queue.start();
  }
}
