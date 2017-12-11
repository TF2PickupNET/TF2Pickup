import React, { PureComponent } from 'react';
import {
  Dialog,
  Button,
  getNotDeclaredProps,
} from 'materialize-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import app from '../../../app';
import { getGamemodeFromUrl } from '../../../../utils/pickup';

/**
 * The component to render the ready up dialog and open or close it when needed.
 *
 * @class
 */
class ReadyUpDialog extends PureComponent {
  static propTypes = { gamemode: PropTypes.string.isRequired };

  /**
   * Ready the user up.
   */
  handleYesPress = () => {
    app.io.emit('pickup-queue.ready-up', { gamemode: this.props.gamemode });
  };

  /**
   * Remove the user from the queue.
   */
  handleNoPress = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  render() {
    return (
      <Dialog {...getNotDeclaredProps(this.props, ReadyUpDialog)}>
        <Helmet>
          <title>Ready Up</title>
        </Helmet>

        <Dialog.Header>
          Are you ready to play?
        </Dialog.Header>

        <Dialog.Actions>
          <Button onPress={this.handleNoPress}>
            No
          </Button>

          <Button onPress={this.handleYesPress}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

export default connect(
  (state) => {
    return { gamemode: getGamemodeFromUrl(state.router.location.pathname) };
  },
)(ReadyUpDialog);
