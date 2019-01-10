import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { RadioGroup } from '@atlaskit/radio';
import { createSelector } from 'reselect';

import regions from '../../../config/regions';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMapState } from '../../store/use-store';
import { updateRegion } from '../../store/users/actions';
import { State } from '../../store';
import { Keys } from '../../../utils/types';

const getRegion = makeGetRegion();

const mapState = (state: State) => {
  return { region: getRegion(state, getCurrentUserId(state)) };
};

const regionKeys = Object.keys(regions) as Keys<typeof regions>;
const options = regionKeys.map((region) => {
  return {
    value: region,
    label: regions[region].fullName,
  };
});

function RegionSetting() {
  const { region } = useMapState(mapState);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const handleChange = useCallback((ev) => {
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
    <RadioGroup
      value={selectedRegion}
      options={options}
      onChange={handleChange}
    />
  );
}

export default {
  selector: createSelector(
    (state: State) => getRegion(state, getCurrentUserId(state)),
    region => (region === null ? null : regions[region].fullName),
  ),
  key: 'region',
  title: 'Region',
  Comp: RegionSetting,
};
