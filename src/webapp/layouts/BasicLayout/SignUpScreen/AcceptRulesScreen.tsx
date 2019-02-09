import React from 'react';
import Button from '@atlaskit/button';
import { acceptRules } from '@webapp/store/users/actions';
import useAsync from '@webapp/utils/use-async';
import Rules from '@webapp/components/Rules';
import { Row } from '@webapp/components/Grid';
import { useActions } from '@webapp/store';

export default function AcceptRulesScreen() {
  const actions = useActions({ acceptRules });
  const {
    isLoading,
    run: handleAcceptClick,
  } = useAsync(async () => {
    await actions.acceptRules();
  });

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
