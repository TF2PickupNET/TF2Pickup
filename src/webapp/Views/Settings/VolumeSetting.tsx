import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import Button from '@atlaskit/button';
import Range from '@atlaskit/range';

import playSound from '../../utils/play-sound';
import { getVolume } from '../../store/settings/selectors';
import { useMapState } from '../../store/use-store';
import { updateVolume } from '../../store/settings/actions';
import { State } from '../../store';

const mapState = (state: State) => {
  return { volume: getVolume(state) };
};

function VolumeSetting() {
  const { volume } = useMapState(mapState);
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
      updateVolume(value);
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
