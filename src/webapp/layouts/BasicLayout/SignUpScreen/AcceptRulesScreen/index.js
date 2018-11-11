// @flow

import React, { useCallback } from 'react';
import {
  Row,
  Button,
} from 'antd';

import MarkdownView from '../../../../components/MarkdownView';
import { acceptRules } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

export default function AcceptRulesScreen() {
  const {
    isLoading,
    run: handleAcceptClick,
  } = useAsync(
    useCallback(() => acceptRules(), []),
  );

  return (
    <React.Fragment>
      <MarkdownView url={RULES_URL} />

      <Row
        type="flex"
        justify="center"
        align="middle"
      >
        <Button
          loading={isLoading}
          onClick={handleAcceptClick}
        >
          Accept Rules
        </Button>
      </Row>
    </React.Fragment>
  );
}
