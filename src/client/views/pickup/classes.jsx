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

class Classes extends PureComponent {
  static styles = {
    container: {
      display: 'grid',
      gridGap: '16px',
      margin: '0 auto',
      boxSizing: 'border-box',

      [breakpoints.up('mobile')]: { gridTemplateColumns: 'minmax(240px, 420px)' },

      [breakpoints.up('tablet')]: {
        gridTemplateColumns: 'minmax(240px, 420px) '.repeat(2),

        '&[data-gamemode="bball"]': { gridTemplateColumns: 'minmax(240px, 420px)' },
      },

      [breakpoints.up('desktop')]: {
        paddingTop: 24,

        '&[data-gamemode="6v6"]': { gridTemplateColumns: 'minmax(240px, 420px) '.repeat(4) },

        '&[data-gamemode="9v9"]': { gridTemplateColumns: 'minmax(240px, 420px) '.repeat(3) },
      },
    },

    slot: {
      width: '100%',
      margin: 0,
    },
  };

  renderCards() {
    const slots = gamemodes[this.props.gamemode].slots;

    return Object
      .keys(slots)
      .map((slot) => {
        const name = capitalize(slot);
        const ClassIcon = Icons[name];

        return (
          <Card
            key={slot}
            className={this.props.classes.slot}
          >
            <List inset>
              <List.Item leftItem={<ClassIcon size={36} />}>
                <Typography typography="headline">
                  {name}
                </Typography>
              </List.Item>

              <List.Divider />

              <List.Item leftItem={<Icon icon="plus" />}>
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
      <div
        className={classes.container}
        data-gamemode={this.props.gamemode}
      >
        {this.renderCards()}
      </div>
    );
  }
}

export default injectSheet(Classes.styles)(Classes);
