// @flow

import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Radio } from 'antd';
import injectSheet from 'react-jss';

import { regions } from '../../../config';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMakeMapState } from '../../utils/use-store';
import { updateRegion } from '../../store/users/actions';

type Props = {
  classes: {
    container: string,
    radio: string,
  },
};

const { Group } = Radio;
const styles = {
  container: { padding: 16 },
  radio: {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  },
};

const makeMapState = () => {
  const getRegion = makeGetRegion();

  return (state) => {
    return { region: getRegion(state, getCurrentUserId(state)) };
  };
};

function RegionSetting(props: Props) {
  const { region } = useMakeMapState(makeMapState);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const handleChange = useCallback((ev: SyntheticInputEvent<HTMLInputElement>) => {
    // $FlowFixMe
    setSelectedRegion(ev.target.value);
  }, []);

  useEffect(() => {
    if (selectedRegion !== region && selectedRegion !== null) {
      updateRegion(selectedRegion);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (region !== selectedRegion && region !== null) {
      setSelectedRegion(region);
    }
  }, [region]);

  return (
    <div className={props.classes.container}>
      <h3>
        Region
      </h3>

      <Group
        value={selectedRegion}
        onChange={handleChange}
      >
        {Object
          .keys(regions)
          .map(regionName => (
            <Radio
              key={regionName}
              value={regionName}
              className={props.classes.radio}
            >
              {regions[regionName].fullName}
            </Radio>
          ))}
      </Group>
    </div>
  );
}

export default injectSheet(styles)(RegionSetting);
