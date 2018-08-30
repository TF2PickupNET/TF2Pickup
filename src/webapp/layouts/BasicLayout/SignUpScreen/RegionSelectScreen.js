// @flow

import React from 'react';
import {
  Row,
  Button,
  Radio,
  message,
} from 'antd';

import { regions } from '../../../../config';
import app from '../../../app';

type State = {
  isProcessing: boolean,
  region: string | null,
};

const { Group } = Radio;

export default class RegionSelectScreen extends React.PureComponent<{}, State> {
  static renderRadios(): Node {
    return Object.keys(regions).map(region => (
      <Radio
        key={region}
        value={region}
      >
        {regions[region].fullName}
      </Radio>
    ));
  }

  state = {
    isProcessing: false,
    region: null,
  };

  isMounted = true;

  componentWillUnmount() {
    this.isMounted = false;
  }

  handleClick = () => {
    const { region } = this.state;

    if (region === null) {
      return;
    }

    this.setState({ isProcessing: true });

    app.io.emit('users:change-region', { region }, (err) => {
      if (err) {
        message.error(`Couldn't set the region: ${err.message}`);
      }

      if (this.isMounted) {
        this.setState({ isProcessing: false });
      }
    });
  };

  handleRadioChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ region: ev.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Group
          value={this.state.region}
          onChange={this.handleRadioChange}
        >
          {RegionSelectScreen.renderRadios()}
        </Group>

        <Row
          type="flex"
          justify="center"
          align="middle"
        >
          <Button
            loading={this.state.isProcessing}
            onClick={this.handleClick}
          >
            Select Region
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}
