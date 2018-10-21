// @flow

import React from 'react';
import EventListener from 'react-event-listener';
import injectSheet from 'react-jss';
import { Picker } from 'emoji-mart';
import ReactDOM from 'react-dom';

type Props = {
  show: boolean,
  onSelect: (emoji: {}) => void,
  onClose: () => void,
};
type State = { recentlyUsedEmojis: $ReadOnlyArray<string> };

const styles = {
  '@global': {
    '.emoji-mart': {
      position: 'absolute',
      right: 5,
      height: 334,
      top: -334,
      zIndex: 500,
    },

    '.emoji-mart-scroll': { height: 180 },
  },
};

class EmojiPicker extends React.PureComponent<Props, State> {
  state = { recentlyUsedEmojis: [] };

  interval: IntervalID;

  lastOpen: Date;

  componentDidMount() {
    this.loadRecentlyUsedEmojis();

    this.interval = setInterval(() => this.loadRecentlyUsedEmojis(), 1000 * 30);
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.show && this.props.show) {
      this.lastOpen = new Date();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadRecentlyUsedEmojis() {
    const list = window.localStorage.getItem('recently-used-emojis') || '';

    this.setState({ recentlyUsedEmojis: list.split(',') });
  }

  addEmojiToRecentEmojis(emoji) {
    this.setState((state) => {
      const recentlyUsedEmojis = [...new Set([
        emoji.id,
        ...state.recentlyUsedEmojis,
      ])];

      window.localStorage.setItem('recently-used-emojis', recentlyUsedEmojis.join(','));

      return { recentlyUsedEmojis };
    });
  }

  handleSelect = (emoji) => {
    this.addEmojiToRecentEmojis(emoji);

    this.props.onSelect(emoji);
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleClick = (event) => {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this);

    if (node === null || !this.lastOpen) {
      return;
    }

    if (!node.contains(event.target) && new Date() - this.lastOpen > 250) {
      this.props.onClose();
    }
  };

  render() {
    return this.props.show
      ? (
        <EventListener
          target="window"
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
        >
          <Picker
            title="Pick your emoji…"
            emoji="point_up"
            perLine={12}
            recent={this.state.recentlyUsedEmojis}
            onSelect={this.handleSelect}
          />
        </EventListener>
      )
      : null;
  }
}

export default injectSheet(styles)(EmojiPicker);
