import React, { useCallback } from 'react';
import { RadioGroup } from '@atlaskit/radio';
import { getEmojiSet } from '@webapp/store/settings/selectors';
import emojiSets from '@config/emoji-sets';
import {
  State,
  useMapState,
  useActions,
} from '@webapp/store';
import { updateEmojiSet } from '@webapp/store/settings/actions';
import { Keys } from '@utils/types';
import { Item } from '@webapp/components/PageNavigation';

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
  const actions = useActions({ updateEmojiSet });
  const handleChange = useCallback((ev) => {
    actions.updateEmojiSet(ev.target.value);
  }, []);

  return (
    <RadioGroup
      value={emoji}
      options={options}
      onChange={handleChange}
    />
  );
}

EmojiSetting.Title = () => (
  <h3>
    Emoji Set
  </h3>
);

EmojiSetting.Navigation = () => {
  const { emoji } = useMapState(mapState);

  return (
    <Item
      path="#emoji"
      text={(
        <React.Fragment>
          <b>Emoji:</b> {emojiSets[emoji].display}
        </React.Fragment>
      )}
    />
  );
};

EmojiSetting.key = 'emoji-set';

export default EmojiSetting;
