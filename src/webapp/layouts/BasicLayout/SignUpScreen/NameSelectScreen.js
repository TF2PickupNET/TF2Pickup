// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Button,
  Radio,
  message,
} from 'antd';

import { regions } from '../../../../config';
import app from '../../../app';
import { type UserProfile } from '../../../../types';
import { type Regions } from '../../../../config/regions';

type Props = {
  profiles: UserProfile,
  region: Regions | null,
};
type State = {
  isProcessing: boolean,
  name: string | null,
};

const { Group } = Radio;

class NameSelectScreen extends React.PureComponent<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, state: State): $Shape<State> {
    if (nextProps.region !== null && state.name === null) {
      const service = regions[nextProps.region].service;

      if (nextProps.profiles[service]) {
        return { name: nextProps.profiles[service].name };
      }
    }

    return null;
  }

  state = {
    isProcessing: false,
    name: null,
  };

  handleClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:set-name', { name: this.state.name }, (err) => {
      if (err) {
        message.error(`Couldn't set the name: ${err.message}`);
      }

      this.setState({ isProcessing: false });
    });
  };

  handleRadioChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ name: ev.target.value });
  };

  renderRadios(): Node {
    return Object
      .keys(regions)
      .map((region) => {
        const service = regions[region].service;

        if (!this.props.profiles[service]) {
          return null;
        }

        return (
          <Radio
            key={service}
            value={service}
          >
            {this.props.profiles[service].name} ({region})
          </Radio>
        );
      });
  }

  render() {
    return (
      <React.Fragment>
        <Group
          value={this.state.name}
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

export default connect((state) => {
  return {
    profiles: state.profile,
    region: state.user.region,
  };
})(NameSelectScreen);
