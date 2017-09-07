import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Toolbar,
  Typography,
  EventHandler,
} from 'materialize-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';

import app from '../../app';
import steamLoginButton from '../../../assets/images/steam_large_noborder.png';

/**
 * The main toolbar above the actual content.
 *
 * @class
 */
export class MainToolbar extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      row: PropTypes.string.isRequired,
      steamLoginImage: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rightContainer: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      services: PropTypes.object.isRequired,
    }),
    redirect: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  static styles = {
    row: {
      composes: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    steamLoginImage: {
      height: 40,
      cursor: 'pointer',
    },

    avatar: {
      height: 48,
      width: 48,
      borderRadius: '50%',
      marginLeft: 16,
    },

    rightContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  state = { title: null };

  /**
   * When we change the title, aka the location changes,
   * we want to reflect the change in the toolbar.
   *
   * @param {Object} props - The new props from react-helmet.
   */
  handleClientStateChange = (props) => {
    this.setState({ title: props.title.split('|')[0].trim() });
  };

  /**
   * Redirect the user to the steam login page upon clicking on the login button.
   */
  handleSteamRedirect = () => {
    app.redirectToSteamAuth();
  };

  /**
   * Redirect the user to his profile.
   */
  handleProfileRedirect = () => {
    this.props.redirect('/profile');
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
          src={steamLoginButton}
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
      <EventHandler
        component="span"
        className={this.props.classes.rightContainer}
        onPress={this.handleProfileRedirect}
      >
        <Typography typography="title">Kampfkeks</Typography>

        <img
          className={this.props.classes.avatar}
          alt="avatar"
          src={user.services.steam.avatar.large}
        />
      </EventHandler>
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

        <div className={classes.row}>
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
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(MainToolbar.styles)(MainToolbar));
