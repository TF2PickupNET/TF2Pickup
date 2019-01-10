import React, {
  useState,
  useCallback,
} from 'react';
import Button from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';

import regions from '../../../../../config/regions';
import { updateRegion } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';
import { Row } from '../../../../components/Grid';

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
  const handleSubmit = useCallback(async () => {
    if (region !== null) {
      await updateRegion(region);
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

      <Row justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleClick}
        >
          Select Region
        </Button>
      </Row>
    </React.Fragment>
  );
}
