// @flow

import React, { type Node } from 'react';
import {
  Radio,
  message,
} from 'antd';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import { regions } from '../../../config';
import app from '../../app';

type Props = {
  region: $Keys<typeof regions>,
  className: string,
  registerSaveHandler: (func: () => void) => void,
  addUpdatedField: (name: string) => void,
  removeUpdatedField: (name: string) => void,
  classes: { radio: string },
};
type State = { region: string };

const { Group } = Radio;
const styles = {
  radio: {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  },
};

class RegionSetting extends React.PureComponent<Props, State> {
  static FIELD_NAME = 'region';

  state = { region: this.props.region };

  constructor(props: Props) {
    super(props);

    props.registerSaveHandler(this.handleSave);
  }

  handleSave = () => {
    console.log('test');

    if (this.state.region === this.props.region) {
      return;
    }

    app.io.emit('users:change-region', { region: this.state.region }, (err) => {
      if (err) {
        message.error(`Couldn't change your region. ${err.message}`);
      } else {
        this.props.removeUpdatedField(RegionSetting.FIELD_NAME);
      }
    });
  };

  handleChange = (ev) => {
    const region = ev.target.value;

    if (region === this.props.region) {
      this.props.removeUpdatedField(RegionSetting.FIELD_NAME);
    } else {
      this.props.addUpdatedField(RegionSetting.FIELD_NAME);
    }

    this.setState({ region });
  };

  renderRadioButtons(): Node {
    return Object.keys(regions).map(region => (
      <Radio
        key={region}
        value={region}
        className={this.props.classes.radio}
      >
        {regions[region].fullName}
      </Radio>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.className}>
          <h3>
            Region
          </h3>

          <Group
            value={this.state.region}
            onChange={this.handleChange}
          >
            {this.renderRadioButtons()}
          </Group>
        </div>
      </React.Fragment>
    );
  }
}

export default connect((state) => {
  return { region: state.user.region };
})(injectSheet(styles)(RegionSetting));
