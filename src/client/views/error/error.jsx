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
import { discordUrls } from '../../../config/client';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import bball from '../../../assets/images/background/bball.jpg';
import ultiduo from '../../../assets/images/background/ultiduo.jpg';

import getErrorMessage from './get-error-message';

/**
 * The error page when an error occurs on the server.
 * The server will redirect the user to this page then.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the jsx.
 */
function Error(props) {
  const query = queryString.parse(props.location.search);
  const code = Number(query.code);
  const redirectToDiscordHelp = () => openWindowInNewTab(discordUrls.help);

  return (
    <div className={props.classes.container}>
      <Helmet><title>Error</title></Helmet>

      <Card className={props.classes.card}>
        <Card.Header>{code} {getErrorMessage(code)}</Card.Header>
        <Card.Content>
          {query.message}

          <br />
          <br />

          If you need more help, check out our
          <Link
            href={discordUrls.help}
            className={props.classes.link}
          >
            #help
          </Link>
          and contact one of the admins.
          Please make sure that you keep your Error ID.

          <br />
          <br />

          Error ID: {query.id}
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
    card: PropTypes.string.isRequired,
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

    card: { maxWidth: 480 },
  };
};

export default injectSheet(Error.styles)(Error);
