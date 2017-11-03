import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar } from 'materialize-react';

import {
  addNotification,
  removeNotification,
} from '../../redux/notifications/actions';
import app from '../../app';

/**
 * A component which renders the snackbars and handles the removal and adding
 * notifications from the server.
 *
 * @class
 */
class Notifications extends PureComponent {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    snackbars: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    user: PropTypes.shape({ id: PropTypes.string }),
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
   * When a snackbar finishes animating out we need to remove it from the store,
   * so the next snackbar will start animating in.
   */
  handleRemoveSnackbar = () => {
    this.props.removeNotification();
  };

  render() {
    return (
      <Snackbar
        snackbars={this.props.snackbars}
        onRemoveSnackbar={this.handleRemoveSnackbar}
      />
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      snackbars: state.notifications,
    };
  },
  (dispatch) => {
    return {
      addNotification: (...args) => dispatch(addNotification(...args)),
      removeNotification: () => dispatch(removeNotification()),
    };
  },
)(Notifications);
