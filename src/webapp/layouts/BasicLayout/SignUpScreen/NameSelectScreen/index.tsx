import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { RadioGroup } from '@atlaskit/radio';
import Button from '@atlaskit/button';

import { getCurrentUserId } from '../../../../store/user-id/selectors';
import { makeGetRegion } from '../../../../store/users/selectors';
import {useMakeMapState} from '../../../../store/use-store';
import useAsync from '../../../../utils/use-async';
import { setName } from '../../../../store/users/actions';
import { makeGetNames } from '../../../../store/user-profiles/selectors';
import {Row} from "../../../../components/Grid";
import {createSelector} from "reselect";
import {State} from "../../../../store";

const makeMapState = () => {
  const getRegion = makeGetRegion();
  const getNames = createSelector(
    makeGetNames(),
    names => names.map((name) => {
      return {
        region: name.region,
        value: name.name,
        label: name.name,
      };
    })
  );

  return (state: State) => {
    const userId = getCurrentUserId(state);

    return {
      names: getNames(state, userId),
      region: getRegion(state, userId),
    };
  };
};

function useSelectName() {
  const [selectedName, setSelectedName] = useState<null | string>(null);
  const {
    names,
    region,
  } = useMakeMapState(makeMapState);
  const onSubmit = useCallback(() => {
    if (selectedName === null) {
      return Promise.resolve();
    }

    return setName(selectedName);
  }, [selectedName]);
  const {
    isLoading,
    run: handleSubmit,
  } = useAsync(onSubmit);
  const handleChange = useCallback(
    (ev) => setSelectedName(ev.target.value),
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

      <Row justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Select Name
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default NameSelectScreen;
