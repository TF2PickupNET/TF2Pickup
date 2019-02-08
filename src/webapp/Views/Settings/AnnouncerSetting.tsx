import React, {
  useCallback,
  ChangeEvent,
} from 'react';
import { RadioGroup } from '@atlaskit/radio';
import { getAnnouncer } from '@webapp/store/settings/selectors';
import {
  useMapState,
  State,
  useActions,
} from '@webapp/store';
import { updateAnnouncer } from '@webapp/store/settings/actions';
import { Keys } from '@utils/types';
import announcers from '@config/announcers';

const mapState = (state: State) => {
  return { announcer: getAnnouncer(state) };
};

const emojiSetKeys = Object.keys(announcers) as Keys<typeof announcers>;
const options = emojiSetKeys.map((announcer) => {
  return {
    value: announcer,
    label: announcers[announcer].display,
  };
});

function AnnouncerSetting() {
  const { announcer } = useMapState(mapState);
  const actions = useActions({ updateAnnouncer });
  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value in announcers) {
      actions.updateAnnouncer(ev.target.value as keyof typeof announcers);
    }
  }, []);

  return (
    <RadioGroup
      value={announcer}
      options={options}
      onChange={handleChange}
    />
  );
}

export default {
  key: 'announcer',
  title: 'Announcer',
  Comp: AnnouncerSetting,
};
