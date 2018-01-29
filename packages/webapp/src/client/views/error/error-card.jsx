import React from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { pipe } from '@tf2-pickup/utils';
import { socialMedia } from '@tf2-pickup/config';

import Link from '../../components/link';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';

import getErrorMessage from './get-error-message';

const redirectToDiscordHelp = () => openWindowInNewTab(socialMedia.discord.urls.help);

/**
 * The error page when an error occurs on the server.
 * The server will redirect the user to this page then.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the jsx.
 */
function ErrorCard(props) {
  const code = Number(props.code);

  return (
    <Card className={props.classes.card}>
      <Card.Header>
        {code}
        {getErrorMessage(code)}
      </Card.Header>

      <Card.Content>
        {props.message}

        <br />
        <br />

        If you need more help, check out our
        <Link
          primary
          href={socialMedia.discord.urls.help}
        >
          #help
        </Link>
        and contact one of the admins.
        Please make sure that you keep your Error ID.

        <br />
        <br />

        Error ID: {props.id}
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
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
};

ErrorCard.styles = { card: { maxWidth: 480 } };

export default pipe(
  connect(state => queryString.parse(state.router.location.search)),
  injectSheet(ErrorCard.styles),
)(ErrorCard);
