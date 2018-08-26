// @flow

import React from 'react';
import {
  message,
  Slider,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import app from '../../app';
import playSound from '../../utils/play-sound';

type Props = {
  volume: number,
  className: string,
  classes: { slider: string },
  registerSaveHandler: (func: () => void) => void,
  addUpdatedField: (name: string) => void,
  removeUpdatedField: (name: string) => void,
};
type State = { volume: number };

const styles = { slider: { marginTop: 50 } };

class VolumeSetting extends React.PureComponent<Props, State> {
  static FIELD_NAME = 'volume';

  state = { volume: this.props.volume };

  constructor(props: Props) {
    super(props);

    props.registerSaveHandler(this.handleSave);
  }

  handleSave = () => {
    app.io.emit('user-settings:change-volume', { volume: this.state.volume }, (err) => {
      if (err) {
        message.error(`Couldn't change your volume. ${err.message}`);
      } else {
        this.props.removeUpdatedField(VolumeSetting.FIELD_NAME);
      }
    });
  };

  handleChange = (value) => {
    if (value === this.props.volume) {
      this.props.removeUpdatedField(VolumeSetting.FIELD_NAME);
    } else {
      this.props.addUpdatedField(VolumeSetting.FIELD_NAME);
    }

    this.setState({ volume: value });
  };

  handleTestClick = () => {
    playSound('notification', { volume: this.state.volume });
  };

  render() {
    return (
      <React.Fragment>
        <div className={this.props.className}>
          <h3>
            Volume
          </h3>

          <Slider
            value={this.state.volume}
            min={0}
            max={100}
            className={this.props.classes.slider}
            onChange={this.handleChange}
          />

          <Button onClick={this.handleTestClick}>
            Test Volume
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect((state) => {
  return { volume: state.settings.volume };
})(injectSheet(styles)(VolumeSetting));
