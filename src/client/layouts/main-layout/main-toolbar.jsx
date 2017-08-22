import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Toolbar,
  Typography,
  EventHandler,
} from 'materialize-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';

import { imageUrl } from '../../config';
import { authUrl } from '../../../config';

/**
 * The main toolbar above the actual content.
 *
 * @class
 */
export class MainToolbar extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      steamLoginImage: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      services: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = { user: null };

  static styles = {
    container: {
      composes: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    steamLoginImage: {
      height: 48,
      cursor: 'pointer',
    },

    avatar: {
      height: 48,
      width: 48,
      borderRadius: '50%',
      marginLeft: 16,
    },
  };

  state = { title: null };

  /**
   * When we change the title, aka the location changes,
   * we want to reflect the change in the toolbar.
   *
   * @param {Object} props - The new props from react-helmet.
   * @param {Object} props.title - The new document title.
   */
  handleClientStateChange = ({ title }) => {
    this.setState({ title });
  };

  /**
   * Redirect the user to the steam login page upon clicking on the login button.
   */
  handleSteamRedirect = () => {
    window.location = authUrl;
  };

  /**
   * Render the steam login button.
   *
   * @returns {JSX} - Returns the steam login button.
   */
  renderLoginButton() {
    return (
      <EventHandler
        component="span"
        onPress={this.handleSteamRedirect}
      >
        <img
          className={this.props.classes.steamLoginImage}
          alt="steam login"
          src={`${imageUrl}/steam_large_noborder.png`}
        />
      </EventHandler>
    );
  }

  /**
   * Render the users avatar and the users name.
   *
   * @returns {JSX} - Returns the JSX.
   */
  renderUserInfo() {
    const { user } = this.props;

    return (
      <div>
        <Typography typography="headline">{user.name}</Typography>

        <img
          alt="avatar"
          src={user.services.steam.avatar.large}
        />
      </div>
    );
  }

  render() {
    const {
      classes,
      user,
    } = this.props;
    const { title } = this.state;

    return (
      <Toolbar>
        <Helmet onChangeClientState={this.handleClientStateChange} />

        <div className={classes.container}>
          {title && <Typography typography="headline">{title}</Typography>}

          {user ? this.renderUserInfo() : this.renderLoginButton()}
        </div>
      </Toolbar>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(MainToolbar.styles)(MainToolbar));
