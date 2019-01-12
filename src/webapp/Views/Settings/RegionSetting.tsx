import React, { useCallback } from 'react';
import { RadioGroup } from '@atlaskit/radio';

import regions from '../../../config/regions';
import { makeGetUserRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMakeMapState } from '../../store/use-store';
import { updateRegion } from '../../store/users/actions';
import { State } from '../../store';
import { Keys } from '../../../utils/types';

const makeMapState = () => {
  const getUserRegion = makeGetUserRegion();

  return (state: State) => {
    return { region: getUserRegion(state, getCurrentUserId(state)) };
  };
};

const regionKeys = Object.keys(regions) as Keys<typeof regions>;
const options = regionKeys.map((region) => {
  return {
    value: region,
    label: regions[region].fullName,
  };
});

function RegionSetting() {
  const { region } = useMakeMapState(makeMapState);
  const handleChange = useCallback((ev) => {
    updateRegion(ev.target.value);
  }, []);

  return (
    <RadioGroup
      value={region}
      options={options}
      onChange={handleChange}
    />
  );
}

export default {
  key: 'region',
  title: 'Region',
  Comp: RegionSetting,
};
