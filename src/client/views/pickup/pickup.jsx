import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Card,
  List,
  Typography,
  breakpoints,
  Icon,
  Ripple,
  Spinner,
} from 'materialize-react';
import capitalize from 'lodash.capitalize';
import get from 'lodash.get';

import gamemodes from '@tf2-pickup/configs/gamemodes';

// eslint-disable-next-line import/no-namespace
import * as Icons from '../../icons';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';

class Gamemode extends PureComponent {
  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    classContainer: {
      display: 'grid',
      gridGap: '16px',
      boxSizing: 'border-box',

      [breakpoints.down('tablet')]: { width: '100%' },

      '&[data-gamemode="bball"]': { gridTemplateColumns: 'minmax(816px, 1fr)' },

      '&[data-gamemode="6v6"]': {
        [breakpoints.up('mobile')]: { gridTemplateColumns: '1fr' },

        [breakpoints.up('tablet')]: { gridTemplateColumns: '1fr 1fr' },

        [breakpoints.up('desktop')]: { gridTemplateColumns: 'minmax(220px, 400px) '.repeat(4) },
      },

      '&[data-gamemode="9v9"]': {
        [breakpoints.up('mobile')]: { gridTemplateColumns: '1fr' },

        [breakpoints.up('tablet')]: { gridTemplateColumns: '1fr 1fr' },

        [breakpoints.up('desktop')]: { gridTemplateColumns: 'minmax(220px, 400px) '.repeat(3) },
      },

      '&[data-gamemode="ultiduo"]': {
        [breakpoints.up('mobile')]: { gridTemplateColumns: '1fr' },

        [breakpoints.up('tablet')]: { gridTemplateColumns: '1fr 1fr' },

        [breakpoints.up('desktop')]: { gridTemplateColumns: 'minmax(220px, 400px) '.repeat(2) },
      },
    },

    slot: {
      width: '100%',
      margin: 0,
      height: 'auto',
    },

    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    hidden: { display: 'none' },

    avatar: {
      height: 40,
      width: 40,
      borderRadius: '50%',
    },
  };

  redirectToUser = id => () => {
    openWindowInNewTab(`/profile/${id}`);
  };

  handleJoinClass = className => () => this.props.join(className);
  handleLeaveClass = () => this.props.remove();

  renderClasses() {
    const {
      classes,
      gamemode,
      user,
      pickup,
    } = this.props;

    return Object
      .keys(gamemodes[gamemode].slots)
      .map((slot) => {
        const name = capitalize(slot);
        const ClassIcon = Icons[name];
        const players = get(pickup, `classes.${slot}`, []);
        const userId = get(user, 'id', null);
        const isInSlot = players.some(player => player.id === userId);
        const requiredPlayers = gamemodes[gamemode].slots[slot];
        const playerCount = players.length;

        return (
          <Card
            key={slot}
            className={classes.slot}
          >
            <List inset>
              <List.Item leftItem={<ClassIcon size={36} />}>
                <span className={classes.listHeader}>
                  <Typography typography="headline">
                    {name}
                  </Typography>

                  <Typography typography="title">
                    {playerCount} / {requiredPlayers}
                  </Typography>
                </span>
              </List.Item>

              <List.Divider className={players.length === 0 ? classes.hidden : ''} />

              {players.map(player => (
                <List.Item
                  key={player.id}
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
                </List.Item>
              ))}

              <List.Divider className={user ? '' : classes.hidden} />

              <List.Item
                className={user ? '' : classes.hidden}
                leftItem={<Icon icon={isInSlot ? 'close' : 'plus'} />}
                onClick={isInSlot ? this.handleLeaveClass : this.handleJoinClass(slot)}
              >
                {isInSlot ? 'Remove' : 'Join Class'}

                <Ripple />
              </List.Item>
            </List>
          </Card>
        );
      });
  }

  render() {
    const { classes } = this.props;

    if (this.props.pickup) {
      return (
        <div
          className={classes.classContainer}
          data-gamemode={this.props.gamemode}
        >
          {this.renderClasses()}
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <Spinner active />
      </div>
    );
  }
}

export default injectSheet(Gamemode.styles)(Gamemode);
