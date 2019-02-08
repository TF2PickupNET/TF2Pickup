import React, { useCallback } from 'react';
import { Emoji as EmojiIcon } from 'emoji-mart';
import { getEmojiSet } from '@webapp/store/settings/selectors';
import {
  State,
  useMapState,
} from '@webapp/store';

interface Props {
  emoji: string,
  size: number,
}

function Emoji(props: Props) {
  const mapState = useCallback((state: State) => {
    return { emojiSet: getEmojiSet(state) };
  }, []);
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
