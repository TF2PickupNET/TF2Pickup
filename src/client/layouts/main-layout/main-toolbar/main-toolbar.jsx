import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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

import app from '../../../app';
import steamLoginButton from '../../../../assets/images/steam_large_noborder.png';
import { OPEN_DRAWER } from '../../../redux/drawer-opened/constants';
import {
  pipe,
  pluck,
} from '../../../../utils/functions';

import UserInfo from './user-info';

/**
 * The main toolbar above the actual content.
 *
 * @class
 */
export class MainToolbar extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      steamLoginImage: PropTypes.string.isRequired,
      rightContainer: PropTypes.string.isRequired,
      menuIcon: PropTypes.string.isRequired,
      spacer: PropTypes.string.isRequired,
    }).isRequired,
    openDrawer: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

  static styles = {
    steamLoginImage: {
      height: 40,
      cursor: 'pointer',
    },

    rightContainer: {
      display: 'flex',
      alignItems: 'center',

      [breakpoints.only('mobile')]: { display: 'none' },
    },

    spacer: { flex: 1 },

    menuIcon: {
      marginRight: 8,

      [breakpoints.up('desktop')]: { display: 'none' },
    },
  };

  state = { title: '' };

  /**
   * When we change the title, aka the location changes,
   * we want to reflect the change in the toolbar.
   *
   * @param {Object} props - The new props from react-helmet.
   */
  handleClientStateChange = (props) => {
    this.setState({
      title: props.title
        ? props.title.split('|')[0].trim()
        : '',
    });
  };

  /**
   * Redirect the user to the steam login page upon clicking on the login button.
   */
  handleLoginRedirect = () => app.redirectToSteamAuth();

  handlePress = () => this.props.openDrawer();

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

        <Typography typography="headline">
          {this.state.title}
        </Typography>

        <span className={this.props.classes.spacer} />

        <span className={this.props.classes.rightContainer}>
          {this.props.userId ? <UserInfo /> : (
            <img // eslint-disable-line
              className={this.props.classes.steamLoginImage}
              alt="steam login"
              src={steamLoginButton}
              onClick={this.handleLoginRedirect}
            />
          )}
        </span>
      </Layout>
    );
  }
}

export default pipe(
  connect(
    (state) => {
      return { userId: pluck('user.id')(state) };
    },
    (dispatch) => {
      return {
        openDrawer() {
          return dispatch({ type: OPEN_DRAWER });
        },
      };
    },
  ),
  injectSheet(MainToolbar.styles),
)(MainToolbar);
