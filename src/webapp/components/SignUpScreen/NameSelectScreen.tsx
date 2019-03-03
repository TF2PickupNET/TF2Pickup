import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { RadioGroup } from '@atlaskit/radio';
import Button from '@atlaskit/button';
import { createSelector } from 'reselect';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import useAsync from '@webapp/utils/use-async';
import { setName } from '@webapp/store/users/actions';
import { makeGetNames } from '@webapp/store/user-profiles/selectors';
import { Container } from '@webapp/components/Grid';
import {
  State,
  useMakeMapState,
  useActions,
} from '@webapp/store';

const makeMapState = () => {
  const getUserRegion = makeGetUserRegion();
  const getNames = createSelector(
    makeGetNames(),
    names => names.map((name) => {
      return {
        region: name.region,
        value: name.name,
        label: name.name,
      };
    }),
  );

  return (state: State) => {
    const userId = getCurrentUserId(state);

    return {
      names: getNames(state, userId),
      region: getUserRegion(state, userId),
    };
  };
};

function useSelectName() {
  const [selectedName, setSelectedName] = useState<null | string>(null);
  const actions = useActions({ setName });
  const {
    names,
    region,
  } = useMakeMapState(makeMapState);
  const onSubmit = useCallback(async () => {
    if (selectedName !== null) {
      await actions.setName(selectedName);
    }
  }, [selectedName]);
  const {
    isLoading,
    run: handleSubmit,
  } = useAsync(onSubmit);
  const handleChange = useCallback(
    ev => setSelectedName(ev.target.value),
    [],
  );

  useEffect(() => {
    if (selectedName === null && region !== null) {
      const regionName = names.find(name => name.region === region);

      if (regionName) {
        setSelectedName(regionName.value);
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
      <RadioGroup
        options={names}
        value={selectedName}
        onChange={handleChange}
      />

      <Container justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Select Name
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default NameSelectScreen;
