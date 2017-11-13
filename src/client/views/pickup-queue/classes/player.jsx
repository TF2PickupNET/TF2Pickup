import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import classnames from 'classnames';
import {
  List,
  Ripple,
  colors,
} from 'materialize-react';
import { rgba } from 'polished';
import injectSheet from 'react-jss';

import UserItem from '../../../components/user-item';
import openWindowInNewTab from '../../../utils/open-window-in-new-tab';

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
    }).isRequired,
    player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ready: PropTypes.bool,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    avatar: {
      height: 40,
      width: 40,
      borderRadius: '50%',
      margin: '8px 0',
    },

    ready: { backgroundColor: rgba(colors.green500, 0.25) },
  };

  /**
   * When the user clicks on the user, we create a new tab with the profile.
   */
  handleClick = () => {
    openWindowInNewTab(`/profile/${this.props.player.id}`);
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
          onClick={this.handleClick}
        >
          <UserItem user={this.props.player} />

          <Ripple />
        </List.Item>
      </Aux>
    );
  }
}

export default injectSheet(Player.styles)(Player);
