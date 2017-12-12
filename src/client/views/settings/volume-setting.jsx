import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ExpansionPanel,
  Slider,
  Button,
  Divider,
  Layout,
  breakpoints,
} from 'materialize-react';
import injectSheet from 'react-jss';

import app from '../../app';
import playSound from '../../utils/play-sound';

class VolumeSetting extends PureComponent {
  static styles = {
    headerPart: {
      flexBasis: '40%',
      flexShrink: 0,
    },

    details: {
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
    },

    slider: {
      width: '100%',

      [breakpoints.only('desktop')]: { width: '66%' },
    },
  };

  state = {
    expanded: false,
    volume: this.props.volume,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.volume !== this.props.volume) {
      this.setState({ volume: nextProps.volume });
    }
  }

  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        volume: this.props.volume,
      };
    });
  };

  handleVolumeChange = (volume) => {
    this.setState({ volume });
  };

  handleSave = () => {
    app.io.emit(
      'user.change-volume',
      { volume: this.state.volume },
      () => this.handleChange(),
    );
  };

  handleTestSoundPress = () => {
    playSound('notification', this.state.volume);
  };

  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleChange}
      >
        <ExpansionPanel.Summary>
          <span className={this.props.classes.headerPart}>
            Volume:
          </span>

          <span className={this.props.classes.headerPart}>
            {this.props.volume}%
          </span>
        </ExpansionPanel.Summary>

        <ExpansionPanel.Details className={this.props.classes.details}>
          <Slider
            className={this.props.classes.slider}
            value={this.state.volume}
            onChange={this.handleVolumeChange}
          />

          <Button onPress={this.handleTestSoundPress}>
            Test sound
          </Button>
        </ExpansionPanel.Details>

        <Divider />

        <ExpansionPanel.Actions>
          <Button onPress={this.handleChange}>
            Cancel
          </Button>

          <Button
            disabled={this.state.theme === this.props.volume}
            onPress={this.handleSave}
          >
            Save
          </Button>
        </ExpansionPanel.Actions>
      </ExpansionPanel>
    );
  }
}

export default connect(
  (state) => {
    return { volume: state.user.settings.volume };
  },
)(injectSheet(VolumeSetting.styles)(VolumeSetting));
