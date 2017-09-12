import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Card,
  List,
  Typography,
  breakpoints,
} from 'materialize-react';
import capitalize from 'lodash.capitalize';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import * as Icons from '../../icons';

class Classes extends PureComponent {
  renderCards() {
    const slots = gamemodes[this.props.gamemode].slots;

    return Object
      .keys(slots)
      .map((slot) => {
        const name = capitalize(slot);
        const Icon = Icons[name];

        return (
          <Card
            key={slot}
            className={`${this.props.classes.slot} ${slot}`}
          >
            <List inset>
              <List.Item leftItem={<Icon size={36} />}>
                <Typography typography="headline">
                  {name}
                </Typography>
              </List.Item>
            </List>
          </Card>
        );
      });
  }

  static styles = {
    container: {
      [breakpoints.only('mobile')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& > *': { width: '100%' },
      },

      [breakpoints.only('desktop')]: { paddingTop: 16 },
    },

    sixvsix: {
      [breakpoints.only('tablet')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',

        '& > .scout, .demoman': {
          justifySelf: 'end',
          width: '100%',
        },
      },

      [breakpoints.only('desktop')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',

        '& > *': { width: '100%' },
      },
    },

    ninevnine: {
      [breakpoints.only('tablet')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto'.repeat(5),

        '& > *': { width: '100%' },
        '& > *:nth-child(odd)': { justifySelf: 'end' },
      },

      [breakpoints.only('desktop')]: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gridTemplateRows: 'auto'.repeat(3),

        '& > *': { width: '100%' },
      },
    },

    bball: {
      display: 'flex',
      justifyContent: 'center',

      '& > *': { width: '100%' },
    },

    ultiduo: {
      [breakpoints.up('tablet')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        '& > *': { width: '100%' },
      },
    },

    slot: { margin: 8 },
  };

  static getGamemodeClassname(gamemode) {
    switch (gamemode) {
      case '6v6': return 'sixvsix';
      case '9v9': return 'ninevnine';
      default: return gamemode;
    }
  }

  render() {
    const { classes } = this.props;
    const gamemodeClassName = Classes.getGamemodeClassname(this.props.gamemode);

    return (
      <div className={`${classes.container} ${classes[gamemodeClassName]}`}>
        {this.renderCards()}
      </div>
    );
  }
}

export default injectSheet(Classes.styles)(Classes);
