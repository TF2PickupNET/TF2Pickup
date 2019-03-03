import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import Button from '@atlaskit/button';
import Range from '@atlaskit/range';
import playSound from '@webapp/utils/play-sound';
import { getVolume } from '@webapp/store/settings/selectors';
import {
  useMapState,
  State,
  useActions,
} from '@webapp/store';
import { updateVolume } from '@webapp/store/settings/actions';
import { Item } from '@webapp/components/PageNavigation';

const mapState = (state: State) => {
  return { volume: getVolume(state) };
};

function VolumeSetting() {
  const { volume } = useMapState(mapState);
  const actions = useActions({ updateVolume });
  const [selectedVolume, setSelectedVolume] = useState(volume);
  const update = useRef<number | null>(null);

  // Play a sound with the currently selected volume
  const handleTestClick = useCallback(
    () => playSound('notification', { volume: selectedVolume }),
    [selectedVolume],
  );

  // Update the currently selected volume
  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(ev.target.value, 10);

    setSelectedVolume(value);

    // Remove the previous timeout if one exists
    if (update.current !== null) {
      clearTimeout(update.current);
    }

    // Update the value on the server after 1s
    update.current = setTimeout(() => {
      actions.updateVolume(value);
    }, 1000);
  }, []);

  useEffect(() => {
    setSelectedVolume(volume);
  }, [volume]);

  return (
    <React.Fragment>
      <Range
        value={selectedVolume}
        onChange={handleChange}
      />

      <Button onClick={handleTestClick}>
        Test Volume
      </Button>
    </React.Fragment>
  );
}

VolumeSetting.Title = () => (
  <h3>
    Volume
  </h3>
);

VolumeSetting.Navigation = () => {
  const { volume } = useMapState(mapState);

  return (
    <Item
      path="#volume"
      text={(
        <React.Fragment>
          <b>Volume:</b> {volume}%
        </React.Fragment>
      )}
    />
  );
};

VolumeSetting.key = 'volume';

export default VolumeSetting;
