import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Layout,
  RadioButtonGroup,
  RadioButton,
  Label,
} from 'materialize-react';

import app from '../../app';

/**
 * The section for accepting the rules.
 *
 * @class
 */
class ThemeSection extends PureComponent {
  static propTypes = { classes: PropTypes.shape({ container: PropTypes.string }).isRequired };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridGap: '8px',
      flex: 1,
    },
  };

  state = { selectedTheme: 'light' };

  /**
   * Change the state when the user selects a different theme.
   */
  handleChange = (theme) => {
    this.setState({ selectedTheme: theme });
  };

  /**
   * Set the theme in the database.
   */
  handleSetTheme = () => {
    app.io.emit('user.change-theme', { theme: this.state.selectedTheme });
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <Typography typography="title">
          Would you like to use the dark theme?
        </Typography>

        <RadioButtonGroup
          selected={this.state.selectedTheme}
          onChange={this.handleChange}
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

        <Layout mainAlign="center">
          <Button onPress={this.handleSetTheme}>
            Set theme
          </Button>
        </Layout>
      </div>
    );
  }
}

export default injectSheet(ThemeSection.styles)(ThemeSection);
