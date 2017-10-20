import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar } from 'materialize-react';

import app from '../../app';
import {
  removeNotification,
  addNotification,
} from '../../redux/notifications/actions';

/**
 * A component to render all of the notifications which are currently in the redux store.
 *
 * @class
 */
class Notifications extends PureComponent {
  static propTypes = {
    snackbars: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    user: PropTypes.shape({ id: PropTypes.string }),
    removeNotification: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  /**
   * Listen to the notifications.add event.
   */
  componentWillMount() {
    app.io.on('notifications.add', this.addNotification);
  }

  /**
   * Add a notification when we receive an event from the server.
   *
   * @param {Object} data - The data from the event.
   * @param {String[]} data.forUsers - For which the users is the notification.
   * When it is null, we add the notification for every user.
   * @param {String} data.message - The message of the notification.
   * @param {Object} [data.options] - The options for the notification.
   */
  addNotification = ({
    forUsers,
    message,
    options = {},
  }) => {
    if (forUsers === null) {
      this.props.addNotification(message, options);
    } else if (this.props.user && forUsers.includes(this.props.user.id)) {
      this.props.addNotification(message, options);
    }
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
    return this.renderSnackbars();
  }
}

export default connect((state) => {
  return {
    snackbars: state.notifications,
    user: state.user,
  };
}, (dispatch) => {
  return {
    removeNotification(id) {
      return dispatch(removeNotification(id));
    },
    addNotification(message, options) {
      return dispatch(addNotification(message, options));
    },
  };
})(Notifications);
