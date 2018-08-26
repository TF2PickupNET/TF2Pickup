// @flow

import React from 'react';

import playSound from '../../utils/play-sound';

export default class SoundFix extends React.Component {
  playedSound = false;

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleClick = () => {
    if (document.visibilityState === 'visible' && !this.playedSound) {
      playSound('sound-fix', { volume: 1 });

      this.playedSound = true;

      document.removeEventListener('click', this.handleClick);
    }
  };

  render() {
    return null;
  }
}
