import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Aux from 'react-aux';
import {
  Toolbar,
  Typography,
  IconButton,
  breakpoints,
  Layout,
} from 'materialize-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';

import app from '../../app';
import steamLoginButton from '../../../assets/images/steam_large_noborder.png';
import { OPEN_DRAWER } from '../../redux/drawer-opened/constants';

/**
 * The main toolbar above the actual content.
 *
 * @class
 */
export class MainToolbar extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      steamLoginImage: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rightContainer: PropTypes.string.isRequired,
      menuIcon: PropTypes.string.isRequired,
      spacer: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      services: PropTypes.object.isRequired,
    }),
    redirect: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  static styles = {
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

      [breakpoints.only('mobile')]: { display: 'none' },
    },

    spacer: { flex: 1 },

    menuIcon: {
      display: 'inline-block',
      marginRight: 8,
      [breakpoints.up('desktop')]: { display: 'none' },
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
  handleRedirect = () => {
    if (this.props.user) {
      this.props.redirect(`/profile/${this.props.user.id}`);
    } else {
      app.redirectToSteamAuth();
    }
  };

  handlePress = () => this.props.openDrawer();

  /**
   * Render the steam login button.
   *
   * @returns {JSX} - Returns the steam login button.
   */
  renderLoginButton() {
    return (
      <img
        className={this.props.classes.steamLoginImage}
        alt="steam login"
        src={steamLoginButton}
      />
    );
  }

  /**
   * Render the users avatar and the users name.
   *
   * @returns {JSX} - Returns the JSX.
   */
  renderUserInfo() {
    return (
      <Aux>
        {this.props.user.name && (
          <Typography typography="title">
            {this.props.user.name}
          </Typography>
        )}

        <img
          className={this.props.classes.avatar}
          alt="avatar"
          src={this.props.user.services.steam.avatar.large}
        />
      </Aux>
    );
  }

  /**
   * Render the title for the page.
   *
   * @returns {JSX} - Returns the title.
   */
  renderTitle() {
    if (this.state.title) {
      return (
        <Typography typography="headline">
          {this.state.title}
        </Typography>
      );
    }

    return null;
  }

  render() {
    return (
      <Layout
        component={Toolbar}
        crossAlign="center"
      >
        <Helmet onChangeClientState={this.handleClientStateChange} />

        <IconButton
          icon="menu"
          className={this.props.classes.menuIcon}
          onPress={this.handlePress}
        />

        {this.renderTitle()}

        <span className={this.props.classes.spacer} />

        <span // eslint-disable-line jsx-a11y/click-events-have-key-events
          role="presentation"
          className={this.props.classes.rightContainer}
          onClick={this.handleRedirect}
        >
          {this.props.user ? this.renderUserInfo() : this.renderLoginButton()}
        </span>
      </Layout>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
  (dispatch) => {
    return {
      redirect: url => dispatch(push(url)),
      openDrawer: () => dispatch({ type: OPEN_DRAWER }),
    };
  },
)(injectSheet(MainToolbar.styles)(MainToolbar));
