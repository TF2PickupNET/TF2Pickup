import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ExpansionPanel,
  Typography,
  RadioButtonGroup,
  RadioButton,
  Button,
  Divider,
  Label,
} from 'materialize-react';
import injectSheet from 'react-jss';

import app from '../../app';
import { capitalize } from '../../../utils/functions';

class ThemeSetting extends PureComponent {
  static styles = {
    headerPart: {
      flexBasis: '40%',
      flexShrink: 0,
    },
  };

  state = {
    expanded: false,
    theme: this.props.theme,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        theme: this.props.theme,
      };
    });
  };

  handleThemeChange = (theme) => {
    this.setState({ theme });
  };

  handleSave = () => {
    app.io.emit(
      'user.change-theme',
      { theme: this.state.theme },
      () => this.handleChange(),
    );
  };

  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleChange}
      >
        <ExpansionPanel.Summary>
          <span className={this.props.classes.headerPart}>
            Theme:
          </span>

          <span className={this.props.classes.headerPart}>
            {capitalize(this.props.theme)}
          </span>
        </ExpansionPanel.Summary>

        <ExpansionPanel.Details>
          <RadioButtonGroup
            selected={this.state.theme}
            onChange={this.handleThemeChange}
          >
            <Label>
              <RadioButton name="light" />

              Light
            </Label>

            <Label>
              <RadioButton name="dark" />

              Dark
            </Label>
          </RadioButtonGroup>
        </ExpansionPanel.Details>

        <Divider />

        <ExpansionPanel.Actions>
          <Button onPress={this.handleChange}>
            Cancel
          </Button>

          <Button
            disabled={this.state.theme === this.props.theme}
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
    return { theme: state.user.settings.theme };
  },
)(injectSheet(ThemeSetting.styles)(ThemeSetting));
