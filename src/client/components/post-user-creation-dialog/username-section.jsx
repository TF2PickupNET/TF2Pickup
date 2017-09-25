import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Button,
  Spinner,
  RadioButton,
  RadioButtonGroup,
  colors,
} from 'materialize-react';

import Link from '../../components/link';
import app from '../../app';
import { discordUrls } from '../../../config/client';

/**
 * The section for setting the username.
 *
 * @class
 */
class UsernameSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      verticalCenter: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      errorText: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({ name: PropTypes.string }),
  };

  static defaultProps = { user: {} };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridGap: '8px',
      flex: 1,
    },

    verticalCenter: {
      display: 'flex',
      justifyContent: 'center',
    },

    link: {
      color: colors.blue500,
      padding: '0 3px',
    },

    errorText: {
      padding: 12,
      textAlign: 'center',
    },
  };

  state = {
    isLoading: true,
    names: [],
    error: null,
  };

  /**
   * Get the valid names for the current user.
   */
  componentWillMount() {
    app.io.emit('user.get-valid-names', (names) => {
      this.setState({
        isLoading: false,
        names,
      });
    });
  }

  /**
   * Try setting the user name.
   */
  handleSetUsername = () => {
    const name = this.radioButtonGroup.selected;

    app.io.emit('user.set-name', name, ({ error }) => {
      if (error) {
        this.setState({ error });
      }
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className={this.props.classes.container}>
          <Typography typography="title">
            Select a username
          </Typography>

          <Spinner active />
        </div>
      );
    }

    return (
      <div className={this.props.classes.container}>
        <Typography typography="title">
          Select a username
        </Typography>

        <div>
          {this.state.names.length > 0 ? (
            <RadioButtonGroup
              name="username"
              defaultSelected={this.state.names[0].name}
              label=""
              ref={(element) => { this.radioButtonGroup = element; }}
            >
              {this.state.names.map(username => (
                <RadioButton
                  name={username.name}
                  key={username.name}
                >
                  {username.name} ({username.serviceName})
                </RadioButton>
              ))}
            </RadioButtonGroup>
          ) : (
            <div className={this.props.classes.verticalCenter}>
              <span>
                No username from your external services is free.
                <br />
                We are working on an automated solution to this problem.
                Until then, please contact a developer on
                <Link
                  href={discordUrls.help}
                  className={this.props.classes.link}
                >
                  Discord
                </Link>
                to set your username manually.
              </span>
            </div>
          )}

          {this.state.error && (
            <div className={this.props.classes.errorText}>
              {this.state.error}
            </div>
          )}

        </div>

        <div className={this.props.classes.verticalCenter}>
          <Button
            disabled={this.state.names.length === 0 || Boolean(this.props.user.name)}
            onPress={this.handleSetUsername}
          >
            Set username
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
)(injectSheet(UsernameSection.styles)(UsernameSection));
