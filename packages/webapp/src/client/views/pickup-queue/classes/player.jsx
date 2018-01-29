import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  List,
  Icon,
  colors,
} from 'materialize-react';
import { rgba } from 'polished';
import injectSheet from 'react-jss';

import app from '../../../app';
import UserItem from '../../../components/user-item';
import openWindowInNewTab from '../../../utils/open-window-in-new-tab';
import hasPermission from '../../../../utils/has-permission';

/**
 * The player component for the pickup queue view.
 *
 * @class
 */
class Player extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      ready: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      clickable: PropTypes.string.isRequired,
    }).isRequired,
    player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ready: PropTypes.bool,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    gamemode: PropTypes.string.isRequired,
    canKick: PropTypes.bool.isRequired,
  };

  static styles = {
    avatar: {
      height: 40,
      width: 40,
      borderRadius: '50%',
      margin: '8px 0',
    },

    ready: { backgroundColor: rgba(colors.green500, 0.25) },

    clickable: { cursor: 'pointer' },
  };

  /**
   * When the user clicks on the user, we create a new tab with the profile.
   */
  handleRedirectToProfile = () => {
    openWindowInNewTab(`/profile/${this.props.player.id}`);
  };

  /**
   * Emit the socket event when a player should be kicked.
   */
  handleKickIconPress = () => {
    app.io.emit('pickup-queue.kick', {
      gamemode: this.props.gamemode,
      userId: this.props.player.id,
    });
  };

  render() {
    return (
      <Aux>
        <List.Divider inset />
        <List.Item
          inset
          className={classnames(
            { [this.props.classes.ready]: this.props.player.ready },
          )}
          leftItem={(
            <List.Item.Avatar>
              <img
                src={this.props.player.avatar}
                alt="avatar"
                className={this.props.classes.avatar}
              />
            </List.Item.Avatar>
          )}
          rightItem={this.props.canKick ? (
            <Icon
              icon="close"
              className={this.props.classes.clickable}
              onClick={this.handleKickIconPress}
            />
          ) : null}
        >
          <UserItem
            user={this.props.player}
            className={this.props.classes.clickable}
            onClick={this.handleRedirectToProfile}
          />
        </List.Item>
      </Aux>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      user: state.user,
      canKick: state.user
        ? hasPermission('pickup.kick', { roles: state.user.roles }, props.player)
        : false,
    };
  },
)(injectSheet(Player.styles)(Player));
