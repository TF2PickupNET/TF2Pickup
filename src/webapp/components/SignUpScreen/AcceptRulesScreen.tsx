import React from 'react';
import Button from '@atlaskit/button';
import { acceptRules } from '../../store/users/actions';
import useAsync from '../../utils/use-async';
import Rules from '../Rules';
import { Row } from '../Grid';
import { useActions } from '../../store';

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
