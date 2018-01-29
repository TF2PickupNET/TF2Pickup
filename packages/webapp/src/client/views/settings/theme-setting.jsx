import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  RadioButtonGroup,
  RadioButton,
  Button,
  Divider,
  Label,
} from 'materialize-react';
import injectSheet from 'react-jss';
import {
  capitalize,
  pipe,
} from '@tf2-pickup/utils';

import app from '../../app';

/**
 * The component for changing the theme setting.
 *
 * @class
 */
class ThemeSetting extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ headerPart: PropTypes.string.isRequired }).isRequired,
    theme: PropTypes.string.isRequired,
  };

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

  /**
   * Update the locally selected theme when the users theme changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  /**
   * Reset the selected theme when the expansion panel opens / closes.
   */
  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        theme: this.props.theme,
      };
    });
  };

  /**
   * Change the currently selected theme when the user clicks a radio button.
   */
  handleThemeChange = (theme) => {
    this.setState({ theme });
  };

  /**
   * Emit the change-theme event when the user clicks the save button.
   */
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

export default pipe(
  connect((state) => {
    return { theme: state.user.settings.theme };
  }),
  injectSheet(ThemeSetting.styles),
)(ThemeSetting);
