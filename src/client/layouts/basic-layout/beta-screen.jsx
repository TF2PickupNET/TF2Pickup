import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import randomItem from 'random-item';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  Card,
  Button,
} from 'materialize-react';

import ErrorCard from '../../views/error/error-card';
import app from '../../app';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import bball from '../../../assets/images/background/bball.jpg';
import ultiduo from '../../../assets/images/background/ultiduo.jpg';
import { isInBetaMode } from '../../../config/client';
import {
  pipe,
  pluck,
} from '../../../utils/functions';

const bgImage = randomItem([sixes, hl, bball, ultiduo]);

/**
 * The screen to display when the client isn't logged in and the site is in beta mode.
 *
 * @class
 */
class BetaScreen extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
      cardActions: PropTypes.string.isRequired,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

  static styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: 1,
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    card: { maxWidth: 480 },

    cardActions: { justifyContent: 'flex-end' },
  };

  handleLoginRedirect = () => app.redirectToSteamAuth();

  render() {
    if (isInBetaMode && !this.props.userId) {
      return (
        <div className={this.props.classes.container}>
          <Helmet>
            <title>Beta Mode</title>
          </Helmet>

          <Card className={this.props.classes.card}>
            <Card.Header>
              TF2Pickup is currently in beta
            </Card.Header>

            <Card.Content>
              You will need to login to check if you have access to TF2Pickup.
            </Card.Content>

            <Card.Actions className={this.props.classes.cardActions}>
              <Button onPress={this.handleLoginRedirect}>
                Login with Steam
              </Button>
            </Card.Actions>
          </Card>

          {this.props.pathname === '/error' ? (
            <ErrorCard />
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}

export default pipe(
  injectSheet(BetaScreen.styles),
  connect((state) => {
    return {
      pathname: state.router.location.pathname,
      userId: pluck('user.id')(state),
    };
  }),
)(BetaScreen);
