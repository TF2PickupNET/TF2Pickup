// @flow

import React, {
  useState,
  useCallback,
} from 'react';
import {
  Row,
  Button,
  Radio,
} from 'antd';

import { regions } from '../../../../../config';
import { updateRegion } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';

const { Group } = Radio;

const radios = Object.keys(regions).map(region => (
  <Radio
    key={region}
    value={region}
  >
    {regions[region].fullName}
  </Radio>
));

export default function RegionSelectScreen() {
  const [region, setRegion] = useState(null);
  const {
    isLoading,
    run: handleClick,
  } = useAsync(
    useCallback(
      () => (region === null ? Promise.resolve() : updateRegion(region)),
      [region],
    ),
  );
  const handleChange = useCallback(
    // $FlowFixMe
    (ev: SyntheticInputEvent<HTMLInputElement>) => setRegion(ev.target.value),
    [],
  );

  return (
    <React.Fragment>
      <Group
        value={region}
        onChange={handleChange}
      >
        {radios}
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
          Select Region
        </Button>
      </Row>
    </React.Fragment>
  );
}
