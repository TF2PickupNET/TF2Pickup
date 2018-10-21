// @flow

import React from 'react';
import { Emoji as EmojiIcon } from 'emoji-mart';
import { connect } from 'react-redux';

import { getEmojiSet } from '../../store/settings/selectors';
import { type State } from '../../store';

type ConnectedProps = { emojiSet: string };
type OwnProps = {
  emoji: string,
  size: number,
};

function Emoji(props: OwnProps & ConnectedProps) {
  return (
    <EmojiIcon
      {...props}
      emoji={props.emoji}
      set={props.emojiSet}
      size={props.size}
    />
  );
}

// eslint-disable-next-line react/default-props-match-prop-types
Emoji.defaultProps = { size: 24 };

const mapStateToProps = (state: State): ConnectedProps => {
  return { emojiSet: getEmojiSet(state) };
};

export default connect(mapStateToProps)(Emoji);
