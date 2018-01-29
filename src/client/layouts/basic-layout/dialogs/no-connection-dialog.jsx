import React from 'react';
import {
  Dialog,
  Button,
} from 'materialize-react';

import app from '../../../app';

const handleReconnectPress = () => app.io.connect();

/**
 * Render a dialog when the user has no connection to the server.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the dialog.
 */
export default function NoConnectionDialog(props) {
  return (
    <Dialog {...props}>
      <Dialog.Header>
        No connection
      </Dialog.Header>

      <Dialog.Content>
        Please make sure you have a working internet connection.
        <br />
        If you have a internet connection, we are most likely restarting the server.
        <br />
        If the server is not back online in a few minutes, please contact one of the admins.
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={handleReconnectPress}>
          Reconnect
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
