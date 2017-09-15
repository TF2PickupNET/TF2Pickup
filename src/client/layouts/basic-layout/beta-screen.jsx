import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import randomItem from 'random-item';
import Helmet from 'react-helmet';
import {
  Card,
  Button,
  Spinner,
} from 'materialize-react';

import app from '../../app';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import bball from '../../../assets/images/background/bball.jpg';
import ultiduo from '../../../assets/images/background/ultiduo.jpg';

/**
 * The screen to display when the client isn't logged in and the site is in beta mode.
 *
 * @class
 */
class BetaScreen extends PureComponent {
  state = { showBetaPage: false };

  /**
   * Create a timeout to show the beta page after.
   */
  componentWillMount() {
    this.timeout = setTimeout(() => {
      this.setState({ showBetaPage: true });
    }, 500);
  }

  /**
   * Clear the timeout when the component unmounts.
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleLoginRedirect = () => app.redirectToSteamAuth();

  render() {
    const { classes } = this.props;

    if (this.state.showBetaPage) {
      return (
        <div className={`${classes.container} ${classes.backgroundImage}`}>
          <Helmet>
            <title>Beta Mode</title>
          </Helmet>

          <Card>
            <Card.Header>
              TF2Pickup is currently in beta
            </Card.Header>

            <Card.Content>
              You will need to login to check if you have access to TF2Pickup.
            </Card.Content>

            <Card.Actions className={classes.cardActions}>
              <Button onPress={this.handleLoginRedirect}>
                Login with Steam
              </Button>
            </Card.Actions>
          </Card>
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <Helmet>
          <title>Beta Mode</title>
        </Helmet>

        <Spinner active />
      </div>
    );
  }
}

BetaScreen.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    cardActions: PropTypes.string.isRequired,
  }).isRequired,
};

BetaScreen.styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },

  backgroundImage: {
    backgroundImage: `url(${randomItem([sixes, hl, bball, ultiduo])})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  cardActions: { justifyContent: 'flex-end' },
};

export default injectSheet(BetaScreen.styles)(BetaScreen);
