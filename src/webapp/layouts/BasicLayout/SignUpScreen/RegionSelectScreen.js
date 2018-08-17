// @flow

import React from 'react';
import {
  Row,
  Button,
  Radio,
} from 'antd';

import { regions } from '../../../../config';
import app from '../../../app';

type State = {
  isProcessing: boolean,
  region: string | null,
};

const { Group } = Radio;

export default class RegionSelectScreen extends React.PureComponent<{}, State> {
  static NAME = 'region-select';

  static TITLE = 'Select a region';

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

  componentDidMount() {
    // TODO: Add some feature to automatically detect the users region
  }

  handleClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:change-region', { region: this.state.region }, () => {
      this.setState({ isProcessing: false });
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
