import React, { PureComponent } from 'react';
import injectSheet, { withTheme } from 'react-jss';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  Typography,
  Icon,
  Ripple,
  colors,
} from 'materialize-react';
import { rgba } from 'polished';
import gamemodes from '@tf2-pickup/configs/gamemodes';

// eslint-disable-next-line import/no-namespace
import * as Icons from '../../icons';
import app from '../../app';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';
import UserItem from '../../components/user-item';
import {
  capitalize,
  pluck,
} from '../../../utils/functions';

/**
 * The component which renders all of the players that joined the class.
 *
 * @class
 */
class ClassList extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      listHeader: PropTypes.string.isRequired,
      hidden: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      classIcon: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      ready: PropTypes.string.isRequired,
    }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    theme: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}).isRequired,
    slotName: PropTypes.string.isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  static styles = {
    card: { margin: 0 },

    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    hidden: { display: 'none' },

    avatar: {
      height: 40,
      width: 40,
      borderRadius: '50%',
      margin: '8px 0',
    },

    classIcon: { margin: '8px 0' },

    icon: { margin: '0 8px' },

    ready: { backgroundColor: rgba(colors.green500, 0.25) },
  };

  redirectToUser = id => () => {
    openWindowInNewTab(`/profile/${id}`);
  };

  /**
   * Emit the join event.
   */
  handleJoinClass = () => {
    app.io.emit('pickup-queue.join', {
      className: this.props.slotName,
      gamemode: this.props.gamemode,
    });
  };

  /**
   * Emit the remove event.
   */
  handleLeaveClass = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  render() {
    const {
      players,
      theme,
      user,
      slotName,
      gamemode,
    } = this.props;
    const name = capitalize(slotName);
    const ClassIcon = Icons[name];
    const userId = pluck(user, 'id', null);
    const isInSlot = players.some(player => player.id === userId);
    const requiredPlayers = gamemodes[gamemode].slots[slotName];
    const playerCount = players.length;

    return (
      <div>
        <Card className={this.props.classes.card}>
          <List inset>
            <List.Item
              leftItem={(
                <List.Item.Avatar>
                  <ClassIcon
                    size={40}
                    color={theme.iconColor}
                    className={this.props.classes.classIcon}
                  />
                </List.Item.Avatar>
              )}
            >
              <span className={this.props.classes.listHeader}>
                <Typography typography="headline">
                  {name}
                </Typography>

                <Typography typography="title">
                  {playerCount} / {requiredPlayers}
                </Typography>
              </span>
            </List.Item>

            {players.map(player => [
              <List.Divider key={`${player.id}-divider`} />,
              <List.Item
                key={player.id}
                className={player.ready ? this.props.classes.ready : ''}
                leftItem={(
                  <List.Item.Avatar>
                    <img
                      src={player.avatar}
                      alt="avatar"
                      className={this.props.classes.avatar}
                    />
                  </List.Item.Avatar>
                )}
                onClick={this.redirectToUser(player.id)}
              >
                <UserItem user={player} />

                <Ripple />
              </List.Item>,
            ])}

            <List.Divider className={user ? '' : this.props.classes.hidden} />

            <List.Item
              className={user ? '' : this.props.classes.hidden}
              leftItem={(
                <Icon
                  icon={isInSlot ? 'close' : 'plus'}
                  className={this.props.classes.icon}
                />
              )}
              onClick={isInSlot ? this.handleLeaveClass : this.handleJoinClass}
            >
              {isInSlot ? 'Remove' : 'Join Class'}

              <Ripple />
            </List.Item>
          </List>
        </Card>
      </div>
    );
  }
}

export default injectSheet(ClassList.styles)(withTheme(ClassList));
