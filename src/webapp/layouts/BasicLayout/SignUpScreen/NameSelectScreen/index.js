// @flow

import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Row,
  Button,
  Radio,
  message,
} from 'antd';

import { getCurrentUserId } from '../../../../store/user-id/selectors';
import { makeGetRegion } from '../../../../store/users/selectors';
import { useMakeMapState } from '../../../../utils/use-store';
import useAsync from '../../../../utils/use-async';
import { setName } from '../../../../store/users/actions';
import { makeGetNames } from '../../../../store/user-profiles/selectors';

const { Group } = Radio;

const makeMapState = () => {
  const getRegion = makeGetRegion();
  const getNames = makeGetNames();

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      names: getNames(state, userId),
      region: getRegion(state, userId),
    };
  };
};

function useSelectName() {
  const [selectedName, setSelectedName] = useState(null);
  const {
    names,
    region,
  } = useMakeMapState(makeMapState);
  const onSubmit = useCallback(() => {
    if (selectedName === null) {
      message.error('Please select a name first!');

      return Promise.resolve();
    }

    return setName(selectedName);
  }, [selectedName]);
  const {
    isLoading,
    run: handleSubmit,
  } = useAsync(onSubmit);
  const handleChange = useCallback(
    (ev: SyntheticInputEvent<HTMLInputElement>) => setSelectedName(ev.target.value),
    [],
  );

  useEffect(() => {
    if (selectedName === null && region !== null) {
      const regionName = names.find(name => name.region === region);

      if (regionName) {
        setSelectedName(regionName.name);
      }
    }
  }, [region, selectedName]);

  return {
    selectedName,
    handleChange,
    names,
    isLoading,
    handleSubmit,
  };
}

function NameSelectScreen() {
  const {
    selectedName,
    handleChange,
    names,
    isLoading,
    handleSubmit,
  } = useSelectName();

  return (
    <React.Fragment>
      <Group
        value={selectedName}
        onChange={handleChange}
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
          onClick={handleSubmit}
        >
          Select Name
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default NameSelectScreen;
