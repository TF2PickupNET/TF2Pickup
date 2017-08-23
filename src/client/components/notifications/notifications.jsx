import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'materialize-react';

/**
 * A component to render all of the notifications which are currently in the redux store.
 *
 * @class
 */
export default class Notifications extends PureComponent {
  static propTypes = {
    snackbars: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timeout: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    removeNotification: PropTypes.func.isRequired,
  };

  /**
   * Remove the notification from the store
   * when the snackbar controller wants to close the snackbar.
   *
   * @param {String} id - The id of the notification.
   */
  handleClose = id => () => {
    this.props.removeNotification(id);
  };

  /**
   * Render the snackbars from the store.
   *
   * @returns {JSX} - Returns the JSX for the snackbars.
   */
  renderSnackbars() {
    return this.props.snackbars.map(snackbar => (
      <Snackbar
        autoShowOnMount
        key={snackbar.id}
        autoCloseTimer={snackbar.timeout}
        onClose={this.handleClose(snackbar.id)}
      >
        {snackbar.text}
      </Snackbar>
    ));
  }

  render() {
    return (
      <div>
        {this.renderSnackbars()}
      </div>
    );
  }
}
