// @flow

import React from 'react';
import { regions } from '@tf2pickup/config';
import {
  Row,
  Button,
  Radio,
} from 'antd';

import app from '../../../app';

type State = {
  isProcessing: boolean,
  region: null,
};

const { Group } = Radio;

export default class RegionSelectScreen extends React.PureComponent<{}, State> {
  static NAME = 'region-select';

  static TITLE = 'Select a region';

  state = {
    isProcessing: false,
    region: null,
  };

  componentDidMount() {
    // TODO: Add some feature to automatically detect the users region
  }

  handleClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:change-region', { region: this.state.region }, () => {
      this.setState({ isProcessing: false });
    });
  };

  handleRadioChange = (ev) => {
    this.setState({ region: ev.target.value });
  };

  renderRadios() {
    return Object.values(regions).map(region => (
      <Radio value={region.name}>
        {region.fullName}
      </Radio>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Group
          value={this.state.region}
          onChange={this.handleRadioChange}
        >
          {this.renderRadios()}
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
