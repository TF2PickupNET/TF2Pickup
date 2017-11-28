import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
  RadioButton,
  RadioButtonGroup,
  colors,
  Label,
  Layout,
} from 'materialize-react';

import Link from '../../../components/link';
import app from '../../../app';
import { discordUrls } from '../../../../config/client';
import { find } from '../../../../utils/functions';

/**
 * The section for setting the username.
 *
 * @class
 */
class UsernameSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      errorText: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({ settings: PropTypes.shape({ region: PropTypes.string }) }).isRequired,
  };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: '1fr auto auto',
      gridGap: '8px',
      flex: 1,
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

  static regionToServices = {
    eu: 'etf2l',
    na: null,
    oz: 'ozfortress',
  };

  state = {
    isLoading: true,
    names: [],
    selectedName: null,
    error: null,
  };

  /**
   * Get the valid names for the current user.
   */
  componentWillMount() {
    app.io.emit('user.get-valid-names', (names) => {
      if (names) {
        this.setState({
          isLoading: false,
          names,
        });
      }
    });
  }

  /**
   * Preselect the username from the selected region.
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user.settings.region === null && nextProps.user.settings.region !== null) {
      const service = UsernameSection.regionToServices[nextProps.user.settings.region];

      this.setState((state) => {
        if (this.state.error) {
          return null;
        }

        const username = find(name => name.serviceName === service)(state.names);

        return { selectedName: username };
      });
    }
  }

  /**
   * Try setting the user name.
   */
  handleSetUsername = () => {
    app.io.emit('user.set-name', this.state.selectedName, ({ error }) => {
      if (error) {
        this.setState({ error });
      }
    });
  };

  /**
   * Change the state when the user changes the selected username.
   */
  handleNameChange = (name) => {
    this.setState({ selectedName: name });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Layout mainAlign="center">
          <Spinner active />
        </Layout>
      );
    }

    return (
      <div className={this.props.classes.container}>
        {this.state.names.length > 0 ? (
          <RadioButtonGroup
            selected={this.state.selectedName}
            onChange={this.handleNameChange}
          >
            {this.state.names.map(username => (
              <Label key={username.name}>
                <RadioButton name={username.name} />

                {username.name} ({username.serviceName})
              </Label>
            ))}
          </RadioButtonGroup>
        ) : (
          <Layout
            direction="column"
            crossAlign="center"
          >
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
          </Layout>
        )}

        {this.state.error && (
          <div className={this.props.classes.errorText}>
            {this.state.error}
          </div>
        )}

        <Layout mainAlign="center">
          <Button
            disabled={this.state.names.length === 0 || !this.state.selectedName}
            onPress={this.handleSetUsername}
          >
            Set username
          </Button>
        </Layout>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(UsernameSection.styles)(UsernameSection));
