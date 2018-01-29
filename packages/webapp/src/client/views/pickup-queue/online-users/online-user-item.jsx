import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { IconButton } from 'materialize-react';
import { pipe } from '@tf2-pickup/utils';

import UserItem from '../../../components/user-item';
import hasPermission from '../../../../utils/has-permission';
import app from '../../../app';

/**
 * The item for a user in the online users item.
 *
 * @class
 */
class OnlineUserItem extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      item: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      iconContainer: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    canAlert: PropTypes.bool.isRequired,
  };

  static styles = {
    avatar: {
      borderRadius: '50%',
      height: '100%',
      width: '100%',
    },

    item: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr 32px',
      alignItems: 'center',
      gridGap: '8px',
      padding: '4px 12px',
      height: 32,
    },

    iconContainer: {
      height: 32,
      width: 32,
      padding: 8,
      margin: 0,

      '& .icon::before': { fontSize: '16px !important' },
    },
  };

  /**
   * Emit the socket.io event for alerting a user.
   */
  handleAlertPress = () => {
    app.io.emit('user.alert', { userId: this.props.user.id });
  };

  render() {
    return (
      <span className={this.props.classes.item}>
        <img
          alt="avatar"
          src={this.props.user.avatar}
          className={this.props.classes.avatar}
        />

        <UserItem user={this.props.user} />

        {this.props.canAlert ? (
          <IconButton
            icon="account-alert"
            className={this.props.classes.iconContainer}
            onPress={this.handleAlertPress}
          />
        ) : null}
      </span>
    );
  }
}

export default pipe(
  connect((state, props) => {
    const user = state.onlineUsers[props.id];

    return {
      user,
      canAlert: hasPermission('user.alert', state.user, user),
    };
  }),
  injectSheet(OnlineUserItem.styles),
)(OnlineUserItem);
