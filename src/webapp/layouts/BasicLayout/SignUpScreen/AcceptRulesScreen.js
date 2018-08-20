// @flow

import React from 'react';
import {
  Row,
  Button,
  message,
} from 'antd';

import app from '../../../app';
import MarkdownView from '../../../components/MarkdownView';

type State = { isProcessing: boolean };

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

export default class AcceptRulesScreen extends React.PureComponent<{}, State> {
  state = { isProcessing: false };

  isMounted = true;

  componentWillUnmount() {
    this.isMounted = false;
  }

  handleAcceptClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:accept-rules', {}, (err) => {
      if (err) {
        message.error(`Couldn't accept the rules: ${err.message}`);
      }

      if (this.isMounted) {
        this.setState({ isProcessing: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <MarkdownView url={RULES_URL} />

        <Row
          type="flex"
          justify="center"
          align="middle"
        >
          <Button
            loading={this.state.isProcessing}
            onClick={this.handleAcceptClick}
          >
            Accept Rules
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}
