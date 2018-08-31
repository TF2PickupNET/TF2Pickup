// @flow

import React from 'react';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import { createSelector } from 'reselect';
import {
  Row,
  Button,
  Radio,
  message,
} from 'antd';

import { regions } from '../../../../config';
import app from '../../../app';
import { makeGetProfileById } from '../../../store/user-profiles/selectors';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { makeGetRegion } from '../../../store/users/selectors';
import { type State } from '../../../store';

type NameData = {
  service: string,
  region: $Keys<typeof regions>,
  display: string,
  name: string,
};
type Props = {
  names: $ReadOnlyArray<NameData>,
  region: $Keys<typeof regions> | null,
};
type LocalState = {
  isProcessing: boolean,
  name: string | null,
};

const { Group } = Radio;

class NameSelectScreen extends React.PureComponent<Props, LocalState> {
  static getDerivedStateFromProps(nextProps: Props, state: LocalState): $Shape<LocalState> {
    if (nextProps.region !== null && state.name === null) {
      const name = nextProps.names.find(({ region }) => region === nextProps.region);

      if (name) {
        return { name: name.name };
      }
    }

    return null;
  }

  state = {
    isProcessing: false,
    name: null,
  };

  isMounted = true;

  componentWillUnmount() {
    this.isMounted = false;
  }

  handleClick = () => {
    const { name } = this.state;

    if (name === null) {
      return;
    }

    this.setState({ isProcessing: true });

    app.io.emit('users:set-name', { name }, (err) => {
      if (err) {
        message.error(`Couldn't set the name: ${err.message}`);
      }

      if (this.isMounted) {
        this.setState({ isProcessing: false });
      }
    });
  };

  handleRadioChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ name: ev.target.value });
  };

  renderRadios(): Node {
    return this.props.names.map(name => (
      <Radio
        key={name.service}
        value={name.name}
      >
        {name.name} ({name.display})
      </Radio>
    ));
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
            Select Name
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, Props> => {
  const getRegion = makeGetRegion();
  const getNames = createSelector(
    makeGetProfileById(),
    profile => Object
      .keys(regions)
      .filter((name) => {
        const service = regions[name].service;

        // $FlowFixMe: For some reason flow throws an error here
        return Boolean(profile[service]);
      })
      .map((name) => {
        const service = regions[name].service;

        return {
          service,
          region: name,
          display: regions[name].fullName,
          // $FlowFixMe: For some reason flow throws an error here
          name: profile[service],
        };
      }),
  );

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      names: getNames(state, userId),
      region: getRegion(state, userId),
    };
  };
};

export default connect(makeMapStateToProps)(NameSelectScreen);
