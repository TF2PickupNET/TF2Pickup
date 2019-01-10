import React from 'react';
import Button from '@atlaskit/button';

import { acceptRules } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';
import Rules from '../../../../components/Rules';
import { Row } from '../../../../components/Grid';

export default function AcceptRulesScreen() {
  const {
    isLoading,
    run: handleAcceptClick,
  } = useAsync(acceptRules);

  return (
    <React.Fragment>
      <Rules />

      <Row justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleAcceptClick}
        >
          Accept Rules
        </Button>
      </Row>
    </React.Fragment>
  );
}
