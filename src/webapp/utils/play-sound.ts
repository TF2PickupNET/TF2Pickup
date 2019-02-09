import sleep from 'sleep-promise';
import store from '@webapp/store';
import announcers from '@config/announcers';
import {
  getVolume,
  getAnnouncer,
} from '@webapp/store/settings/selectors';

import {
  normalSounds,
  defaultPickupSounds,
} from './sounds';

interface Sound {
  url: string,
  volume: number,
}

interface Options {
  volume?: number,
  announcer?: keyof typeof announcers,
}

type Sounds = keyof typeof normalSounds | keyof typeof defaultPickupSounds;

const MAX_VOLUME = 100;

const SECOND = 1000;

class Queue {
  private items: Sound[] = [];

  private isWorking = false;

  public async add(sound: Sound) {
    this.items = [
      ...this.items,
      sound,
    ];

    await this.start();
  }

  public async start() {
    if (!this.isWorking) {
      this.isWorking = true;

      await this.playSound();
    }
  }

  private stop() {
    this.isWorking = false;
  }

  private async next() {
    if (this.items.length === 0) {
      this.stop();
    } else {
      await this.playSound();
    }
  }

  private async playSound() {
    const [sound, ...sounds] = this.items;

    this.items = sounds;

    const audio = new Audio(sound.url);

    audio.volume = sound.volume / MAX_VOLUME;

    try {
      await audio.play();

      // The duration of the audio is returned as seconds
      const duration = audio.duration * SECOND;

      await sleep(duration);
    } catch (error) {
      console.warn('Error while trying to play audio', error);
    }

    await this.next();
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
    default:
      return null;
  }
}

export default function playSound(
  sound: Sounds,
  options: Options = {},
) {
  const state = store.getState();
  const {
    volume = getVolume(state),
    announcer = getAnnouncer(state),
  } = options;
  const url = getUrl(sound, announcer);

  if (url === null) {
    console.warn(`Couldn't get sound url for: ${sound} ${announcer}`);

    return;
  }

  queue.add({
    url,
    volume,
  });
}
