// @flow

import React from 'react';
import {
  Row,
  Button,
} from 'antd';

import app from '../../../app';

type State = { isProcessing: boolean };

export default class AcceptRulesScreen extends React.PureComponent<{}, State> {
  static NAME = 'accept-rules';

  static TITLE = 'Accept the rules';

  state = { isProcessing: false };

  handleAcceptClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:accept-rules', {}, () => {
      this.setState({ isProcessing: false });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          Rules
        </div>

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
