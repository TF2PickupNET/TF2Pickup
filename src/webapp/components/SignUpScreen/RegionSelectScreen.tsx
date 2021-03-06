import React, {
  useState,
  useCallback,
} from 'react';
import Button from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';
import regions from '@config/regions';
import { updateRegion } from '@webapp/store/users/actions';
import useAsync from '@webapp/utils/use-async';
import { Container } from '@webapp/components/Grid';
import { useActions } from '@webapp/store';

const regionKeys = Object.keys(regions) as Array<keyof typeof regions>;

const options = regionKeys.map((region) => {
  return {
    label: regions[region].fullName,
    value: region,
    name: region,
  };
});

export default function RegionSelectScreen() {
  const [region, setRegion] = useState<null | keyof typeof regions>(null);
  const actions = useActions({ updateRegion });
  const handleSubmit = useCallback(async () => {
    if (region !== null) {
      await actions.updateRegion(region);
    }
  }, [region]);
  const {
    isLoading,
    run: handleClick,
  } = useAsync(handleSubmit);
  const handleChange = useCallback(
    ev => setRegion(ev.target.value),
    [],
  );

  return (
    <React.Fragment>
      <RadioGroup
        value={region}
        options={options}
        onChange={handleChange}
      />

      <Container justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleClick}
        >
          Select Region
        </Button>
      </Container>
    </React.Fragment>
  );
}
