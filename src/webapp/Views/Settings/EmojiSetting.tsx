import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RadioGroup } from '@atlaskit/radio';
import { createSelector } from 'reselect';

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
  const [selectedEmojiSet, setSelectedEmojiSet] = useState(emoji);
  const handleChange = useCallback((ev) => {
    setSelectedEmojiSet(ev.target.value);
  }, []);

  useEffect(() => {
    if (selectedEmojiSet !== emoji) {
      updateEmojiSet(selectedEmojiSet);
    }
  }, [selectedEmojiSet]);

  useEffect(() => {
    if (emoji !== selectedEmojiSet) {
      setSelectedEmojiSet(emoji);
    }
  }, [emoji]);

  return (
    <RadioGroup
      value={selectedEmojiSet}
      options={options}
      onChange={handleChange}
    />
  );
}

export default {
  key: 'emoji-set',
  title: 'Emoji Set',
  selector: createSelector(
    getEmojiSet,
    emojiSet => emojiSets[emojiSet].display,
  ),
  Comp: EmojiSetting,
};
