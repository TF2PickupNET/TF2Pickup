import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Card,
  List,
  Typography,
  breakpoints,
  Icon,
  Ripple,
} from 'materialize-react';
import capitalize from 'lodash.capitalize';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import * as Icons from '../../icons';

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

      [breakpoints.up('mobile')]: { gridTemplateColumns: 'minmax(240px, 420px)' },

      [breakpoints.up('tablet')]: {
        gridTemplateColumns: 'minmax(240px, 420px) '.repeat(2),

        '&[data-gamemode="bball"]': { gridTemplateColumns: 'minmax(240px, 420px)' },
      },

      [breakpoints.up('desktop')]: {
        '&[data-gamemode="6v6"]': { gridTemplateColumns: 'minmax(240px, 420px) '.repeat(4) },

        '&[data-gamemode="9v9"]': { gridTemplateColumns: 'minmax(240px, 420px) '.repeat(3) },
      },
    },

    slot: {
      width: '100%',
      margin: 0,
    },

    hidden: { display: 'none' },
  };

  renderClasses() {
    const {
      classes,
      gamemode,
      user,
    } = this.props;

    return Object
      .keys(gamemodes[gamemode].slots)
      .map((slot) => {
        const name = capitalize(slot);
        const ClassIcon = Icons[name];

        return (
          <Card
            key={slot}
            className={classes.slot}
          >
            <List inset>
              <List.Item leftItem={<ClassIcon size={36} />}>
                <Typography typography="headline">
                  {name}
                </Typography>
              </List.Item>

              <List.Divider className={user ? '' : classes.hidden} />

              <List.Item
                className={user ? '' : classes.hidden}
                leftItem={<Icon icon="plus" />}
              >
                Join Class

                <Ripple />
              </List.Item>
            </List>
          </Card>
        );
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div>
          Info
        </div>

        <div
          className={classes.classContainer}
          data-gamemode={this.props.gamemode}
        >
          {this.renderClasses()}
        </div>
      </div>
    );
  }
}

export default injectSheet(Gamemode.styles)(Gamemode);
