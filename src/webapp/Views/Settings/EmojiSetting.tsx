import React, { useCallback } from 'react';
import { RadioGroup } from '@atlaskit/radio';

import { getEmojiSet } from '../../store/settings/selectors';
import emojiSets from '../../../config/emoji-sets';
import { State } from '../../store';
import { useMapState } from '../../store/use-store';
import { updateEmojiSet } from '../../store/settings/actions';
import { Keys } from '../../../utils/types';

const mapState = (state: State) => {
  return { emoji: getEmojiSet(state) };
};

const emojiSetKeys = Object.keys(emojiSets) as Keys<typeof emojiSets>;
const options = emojiSetKeys.map((emojiSet) => {
  return {
    value: emojiSet,
    label: emojiSets[emojiSet].display,
  };
});

function EmojiSetting() {
  const { emoji } = useMapState(mapState);
  const handleChange = useCallback((ev) => {
    updateEmojiSet(ev.target.value);
  }, []);

  return (
    <RadioGroup
      value={emoji}
      options={options}
      onChange={handleChange}
    />
  );
}

export default {
  key: 'emoji-set',
  title: 'Emoji Set',
  Comp: EmojiSetting,
};
