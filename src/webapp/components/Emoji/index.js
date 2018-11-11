// @flow

import React from 'react';
import { Emoji as EmojiIcon } from 'emoji-mart';

import { getEmojiSet } from '../../store/settings/selectors';
import { type State } from '../../store';
import { useMapState } from '../../utils/use-store';

type Props = {
  emoji: string,
  size: number,
};

const mapState = (state: State) => {
  return { emojiSet: getEmojiSet(state) };
};

function Emoji(props: Props) {
  const { emojiSet } = useMapState(mapState);

  return (
    <EmojiIcon
      {...props}
      emoji={props.emoji}
      set={emojiSet}
      size={props.size}
    />
  );
}

Emoji.defaultProps = { size: 24 };

export default Emoji;
