import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
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

const mapState = (state: State) => {
  return { volume: getVolume(state) };
};

function VolumeSetting() {
  const { volume } = useMapState(mapState);
  const actions = useActions({ updateVolume });
  const [selectedVolume, setSelectedVolume] = useState(volume);
  const update = useRef<NodeJS.Timeout | null>(null);

  // Play a sound with the currently selected volume
  const handleTestClick = useCallback(
    () => playSound('notification', { volume: selectedVolume }),
    [selectedVolume],
  );

  // Update the currently selected volume
  const handleChange = useCallback((value: number) => {
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

export default {
  key: 'volume',
  title: 'Volume',
  Comp: VolumeSetting,
};
