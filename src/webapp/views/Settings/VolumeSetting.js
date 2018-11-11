// @flow

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Slider,
  Button,
} from 'antd';
import injectSheet from 'react-jss';

import playSound from '../../utils/play-sound';
import { getVolume } from '../../store/settings/selectors';
import { useMapState } from '../../utils/use-store';
import { updateVolume } from '../../store/settings/actions';

type Props = {
  classes: {
    container: string,
    slider: string,
  },
};

const styles = {
  container: { padding: 16 },
  slider: { marginTop: 50 },
};

const mapState = (state) => {
  return { volume: getVolume(state) };
};

function VolumeSetting(props: Props) {
  const { volume } = useMapState(mapState);
  const [selectedVolume, setSelectedVolume] = useState(volume);
  const handleTestClick = useCallback(
    () => playSound('notification', { volume: selectedVolume }),
    [selectedVolume],
  );
  const handleChange = useCallback((value: number) => {
    setSelectedVolume(value);
  }, []);
  const handleAfterChange = useCallback(() => {
    if (selectedVolume !== volume) {
      updateVolume(selectedVolume);
    }
  }, [selectedVolume]);

  useEffect(() => {
    if (volume !== selectedVolume) {
      setSelectedVolume(volume);
    }
  }, [volume]);

  return (
    <div className={props.classes.container}>
      <h3>
          Volume
      </h3>

      <Slider
        value={selectedVolume}
        min={0}
        max={100}
        className={props.classes.slider}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
      />

      <Button onClick={handleTestClick}>
          Test Volume
      </Button>
    </div>
  );
}

export default injectSheet(styles)(VolumeSetting);
