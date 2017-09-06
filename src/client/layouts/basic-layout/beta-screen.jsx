import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
} from 'materialize-react';

import app from '../../app';

/**
 * The screen to display when the client isn't logged in and the site is in beta mode.
 *
 * @returns {JSX} - Returns the JSX for the screen.
 */
function BetaScreen({ classes }) {
  const handleLoginRedirect = () => app.redirectToSteamAuth();

  return (
    <div className={classes.container}>
      <Card>
        <Card.Header>
          The site is currently in beta mode!
        </Card.Header>

        <Card.Content>
          You will need to login to check if you currently have access to the website.
        </Card.Content>

        <Card.Actions className={classes.cardActions}>
          <Button onPress={handleLoginRedirect}>
            Login with Steam
          </Button>
        </Card.Actions>
      </Card>
    </div>
  );
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

  cardActions: { justifyContent: 'flex-end' },
};

export default injectSheet(BetaScreen.styles)(BetaScreen);
