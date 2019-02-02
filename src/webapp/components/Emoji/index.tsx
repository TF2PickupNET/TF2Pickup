import React from 'react';
import { Emoji as EmojiIcon } from 'emoji-mart';

import { getEmojiSet } from 'webapp/store/settings/selectors';
import {
  State,
  useMapState,
} from 'webapp/store';

interface OwnProps {
  emoji: string,
  size: number,
}

const mapState = (state: State) => {
  return { emojiSet: getEmojiSet(state) };
};

function Emoji(props: OwnProps) {
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
