import React from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import Link from '../../components/link';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';
import { discordUrls } from '../../../config/client';
import { pipe } from '../../../utils/functions';

import getErrorMessage from './get-error-message';

const redirectToDiscordHelp = () => openWindowInNewTab(discordUrls.help);

/**
 * The error page when an error occurs on the server.
 * The server will redirect the user to this page then.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the jsx.
 */
function ErrorCard(props) {
  const query = queryString.parse(props.location.search);
  const code = Number(query.code);

  return (
    <Card className={props.classes.card}>
      <Card.Header>
        {code}
        {getErrorMessage(code)}
      </Card.Header>

      <Card.Content>
        {query.message}

        <br />
        <br />

        If you need more help, check out our
        <Link
          primary
          href={discordUrls.help}
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
        <Button onPress={redirectToDiscordHelp}>
          Get help
        </Button>
      </Card.Actions>
    </Card>
  );
}

ErrorCard.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
  classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
};

ErrorCard.styles = { card: { maxWidth: 480 } };

export default pipe(
  injectSheet(ErrorCard.styles),
  connect((state) => {
    return { location: state.router.location };
  }),
)(ErrorCard);
