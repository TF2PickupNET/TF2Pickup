import React, { useCallback } from 'react';
import { RadioGroup } from '@atlaskit/radio';

import regions from '@config/regions';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { useMakeMapState, State, useActions } from '@webapp/store';
import { updateRegion } from '@webapp/store/users/actions';
import { Keys } from '@utils/types';

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
  const actions = useActions({ updateRegion });
  const handleChange = useCallback((ev) => {
    actions.updateRegion(ev.target.value);
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
