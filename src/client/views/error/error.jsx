import React from 'react';
import {
  Card,
  Button,
  colors,
} from 'materialize-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import randomItem from 'random-item';

import Link from '../../components/link';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import bball from '../../../assets/images/background/bball.jpg';
import ultiduo from '../../../assets/images/background/ultiduo.jpg';

import getErrorMessage from './get-error-message';

const discordHelpChannelUrl = 'https://discordapp.com/channels/101790253651599360/101807927752409088';

/**
 * The error page when an error occurs on the server.
 * The server will redirect the user to this page then.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.location - The current location including the search string.
 * @param {Object} props.classes - The classes for the styles. Provided by Jss.
 * Passed by React Router.
 * @returns {JSX} - Returns the jsx.
 */
export function Error({
  location,
  classes,
}) {
  const query = queryString.parse(location.search);
  const code = Number(query.code);
  const redirectToDiscordHelp = () => openWindowInNewTab(discordHelpChannelUrl);

  return (
    <div className={classes.container}>
      <Helmet><title>Error</title></Helmet>

      <Card>
        <Card.Header>{getErrorMessage(code)} <br /> (Code: {code})</Card.Header>
        <Card.Content>
          {query.message}

          <br />
          <br />
          Error ID: {query.id}

          <br />
          <br />

          If you need more help, check out our
          <Link
            href={discordHelpChannelUrl}
            className={classes.link}
          >
            #help
          </Link>
          and contact one of the admins.
          Please make sure that you keep your Error ID.
        </Card.Content>

        <Card.Actions>
          <Button onRelease={redirectToDiscordHelp}>
            Get help
          </Button>
        </Card.Actions>
      </Card>
    </div>
  );
}

Error.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

Error.styles = () => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: `url(${randomItem([sixes, hl, bball, ultiduo])})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    link: {
      padding: '0 4px',
      color: colors.blue500,
    },
  };
};

export default injectSheet(Error.styles)(Error);
