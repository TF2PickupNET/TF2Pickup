// @flow

import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { createSelector } from 'reselect';
import {
  Row,
  Button,
  Radio,
} from 'antd';

import { regions } from '../../../../../config';
import { makeGetProfileById } from '../../../../store/user-profiles/selectors';
import { getCurrentUserId } from '../../../../store/user-id/selectors';
import { makeGetRegion } from '../../../../store/users/selectors';
import { useMakeMapState } from '../../../../utils/use-store';
import useAsync from '../../../../utils/use-async';
import { setName } from '../../../../store/users/actions';

const { Group } = Radio;

const makeMapState = () => {
  const getRegion = makeGetRegion();
  const getNames = createSelector(
    makeGetProfileById(),
    profile => Object
      .keys(regions)
      // $FlowFixMe: For some reason flow throws an error here
      .filter(name => Boolean(profile[regions[name].service]))
      .map((name) => {
        const service = regions[name].service;

        return {
          service,
          region: name,
          display: regions[name].fullName,
          // $FlowFixMe: For some reason flow throws an error here
          name: profile[service].name,
        };
      }),
  );

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      names: getNames(state, userId),
      region: getRegion(state, userId),
    };
  };
};

function NameSelectScreen() {
  const {
    names,
    region,
  } = useMakeMapState(makeMapState);
  const [selectedName, setSelectedName] = useState(null);
  const {
    isLoading,
    run: handleClick,
  } = useAsync(
    useCallback(
      () => (selectedName === null ? Promise.resolve() : setName(selectedName)),
      [selectedName],
    ),
  );
  const handleRadioChange = useCallback(
    (ev: SyntheticInputEvent<HTMLInputElement>) => setSelectedName(ev.target.value),
    [],
  );

  useEffect(() => {
    if (selectedName === null) {
      const regionName = names.find(nameInfo => nameInfo.region === region);

      if (regionName) {
        setSelectedName(regionName.name);
      }
    }
  }, [region]);

  return (
    <React.Fragment>
      <Group
        value={selectedName}
        onChange={handleRadioChange}
      >
        {names.map(nameInfo => (
          <Radio
            key={nameInfo.service}
            value={nameInfo.name}
          >
            {nameInfo.name} ({nameInfo.display})
          </Radio>
        ))}
      </Group>

      <Row
        type="flex"
        justify="center"
        align="middle"
      >
        <Button
          loading={isLoading}
          onClick={handleClick}
        >
          Select Name
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default NameSelectScreen;
