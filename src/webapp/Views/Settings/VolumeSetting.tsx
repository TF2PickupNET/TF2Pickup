import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import Button from '@atlaskit/button';
import Range from '@atlaskit/range';
import {createSelector} from "reselect";

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

  // Play a sound with the currently selected volume
  const handleTestClick = useCallback(
    () => playSound('notification', { volume: selectedVolume }),
    [selectedVolume],
  );

  // Update the currently selected volume
  const handleChange = useCallback((value: number) => {
    setSelectedVolume(value);
  }, []);

  // Update the volume in the settings when the user removes focus from the slider
  const handleBlur = useCallback(() => {
    if (selectedVolume !== volume) {
      updateVolume(selectedVolume);
    }
  }, [selectedVolume, volume]);

  // Update the selected volume when the volume from the settings change
  useEffect(() => {
    if (volume !== selectedVolume) {
      setSelectedVolume(volume);
    }
  }, [volume]);

  return (
    <React.Fragment>
      <Range
        value={selectedVolume}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button onClick={handleTestClick}>
          Test Volume
      </Button>
    </React.Fragment>
  );
}

export default {
  selector: createSelector(
    (state: State) => state,
    (state: State) => `${getVolume(state)}%`,
  ),
  key: 'volume',
  title: 'Volume',
  Comp: VolumeSetting,
};
