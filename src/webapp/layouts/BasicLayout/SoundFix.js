// @flow

import React from 'react';

import playSound from '../../utils/play-sound';

export default class SoundFix extends React.Component {
  playedSound = false;

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && !this.playedSound) {
      playSound('sound-fix', { volume: 1 });

      this.playedSound = true;

      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  };

  render() {
    return null;
  }
}
