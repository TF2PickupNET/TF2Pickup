import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import randomItem from 'random-item';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import queryString from 'query-string';
import {
  Card,
  Button,
  Spinner,
  Divider,
  Typography,
} from 'materialize-react';

import app from '../../app';
import getErrorMessage from '../../views/error/get-error-message';
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
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    router: PropTypes.shape({}).isRequired,
  };

  static styles = {
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

    card: { maxWidth: 480 },

    cardActions: { justifyContent: 'flex-end' },

    errorDivider: { marginBottom: 12 },

    errorText: { marginTop: 4 },

    errorContainer: { marginTop: 4 },
  };

  state = { showBetaPage: false };

  /**
   * Create a timeout to show the beta page after.
   */
  componentWillMount() {
    this.timeout = setTimeout(() => {
      this.setState({ showBetaPage: true });
    }, 1000);
  }

  /**
   * Clear the timeout when the component unmounts.
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleLoginRedirect = () => app.redirectToSteamAuth();

  render() {
    const {
      classes,
      router,
    } = this.props;

    const hasError = router.location.pathname === '/error';
    const query = queryString.parse(router.location.search);

    if (this.state.showBetaPage) {
      return (
        <div className={`${classes.container} ${classes.backgroundImage}`}>
          <Helmet>
            <title>Beta Mode</title>
          </Helmet>

          <Card className={classes.card}>
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

            {hasError && (
              <Card.Content className={classes.errorContainer}>
                <Divider className={classes.errorDivider} />

                <Typography typography="title">
                  {query.code} {getErrorMessage(Number(query.code))}
                </Typography>

                <div className={classes.errorText}>{query.message}</div>
              </Card.Content>
            )}
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

export default connect(
  (state) => {
    return { router: state.router };
  },
)(injectSheet(BetaScreen.styles)(BetaScreen));
