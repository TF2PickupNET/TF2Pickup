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
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
      cardActions: PropTypes.string.isRequired,
      errorContainer: PropTypes.string.isRequired,
      errorDivider: PropTypes.string.isRequired,
      errorText: PropTypes.string.isRequired,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      code: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
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
    const hasError = this.props.pathname === '/error';

    if (this.state.showBetaPage) {
      return (
        <div className={`${this.props.classes.container} ${this.props.classes.backgroundImage}`}>
          <Helmet>
            <title>
              Beta Mode
            </title>
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

            {hasError && (
              <Card.Content className={this.props.classes.errorContainer}>
                <Divider className={this.props.classes.errorDivider} />

                <Typography typography="title">
                  {this.props.query.code}
                  {getErrorMessage(Number(this.props.query.code))}
                </Typography>

                <div className={this.props.classes.errorText}>
                  {this.props.query.message}
                </div>
              </Card.Content>
            )}
          </Card>
        </div>
      );
    }

    return (
      <div className={this.props.classes.container}>
        <Helmet>
          <title>
            Beta Mode
          </title>
        </Helmet>

        <Spinner active />
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      pathname: state.router.location.pathname,
      query: queryString.parse(state.router.location.search),
    };
  },
)(injectSheet(BetaScreen.styles)(BetaScreen));
