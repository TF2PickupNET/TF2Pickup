import React, { PureComponent } from 'react';
import injectSheet, { withTheme } from 'react-jss';
import {
  Card,
  List,
  Typography,
  Icon,
  Ripple,
  colors,
} from 'materialize-react';
import capitalize from 'lodash.capitalize';
import get from 'lodash.get';
import { rgba } from 'polished';

import gamemodes from '@tf2-pickup/configs/gamemodes';

// eslint-disable-next-line import/no-namespace
import * as Icons from '../../icons';
import app from '../../app';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';

class ClassList extends PureComponent {
  static styles = {
    card: { margin: 0 },

    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    hidden: { display: 'none'   },

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

  handleJoinClass = () => {
    app.io.emit('pickup-queue.join', {
      className: this.props.slotName,
      gamemode: this.props.gamemode,
    });
  };

  handleLeaveClass = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  redirectToUser = id => () => {
    openWindowInNewTab(`/profile/${id}`);
  };

  render() {
    const {
      players,
      theme,
      user,
      slotName,
      gamemode,
      classes,
    } = this.props;
    const name = capitalize(slotName);
    const ClassIcon = Icons[name];
    const userId = get(user, 'id', null);
    const isInSlot = players.some(player => player.id === userId);
    const requiredPlayers = gamemodes[gamemode].slots[slotName];
    const playerCount = players.length;

    return (
      <div>
        <Card className={classes.card}>
          <List inset>
            <List.Item
              leftItem={(
                <List.Item.Avatar>
                  <ClassIcon
                    size={40}
                    color={theme.iconColor}
                    className={classes.classIcon}
                  />
                </List.Item.Avatar>
              )}
            >
              <span className={classes.listHeader}>
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
                className={player.ready ? classes.ready : ''}
                leftItem={(
                  <List.Item.Avatar>
                    <img
                      src={player.avatar}
                      alt="avatar"
                      className={classes.avatar}
                    />
                  </List.Item.Avatar>
                )}
                onClick={this.redirectToUser(player.id)}
              >
                {player.name}

                <Ripple />
              </List.Item>,
            ])}

            <List.Divider className={user ? '' : classes.hidden} />

            <List.Item
              className={user ? '' : classes.hidden}
              leftItem={(
                <Icon
                  icon={isInSlot ? 'close' : 'plus'}
                  className={classes.icon}
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
