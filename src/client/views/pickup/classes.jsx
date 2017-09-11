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
      .map(slot => capitalize(slot))
      .map((slot) => {
        const Icon = Icons[slot];

        return (
          <Card
            key={slot}
            className={this.props.classes.slot}
            style={{ gridArea: slot }}
          >
            <List inset>
              <List.Item leftItem={<Icon size={40} />}>
                <Typography typography="headline">
                  {slot}
                </Typography>
              </List.Item>
            </List>
          </Card>
        );
      });
  }

  static styles = {
    container: {
      display: 'grid',
      paddingTop: 16,
      gridTemplateColumns: '1fr',

      '&.6v6': {
        gridTemplateRows: 'auto auto auto auto',
        gridTemplateAreas: `
          "Scout"
          "Soldier"
          "Demoman"
          "Medic"
        `,
      },

      '&.9v9': {
        gridTemplateRows: 'auto auto auto auto auto auto auto auto auto',
        gridTemplateAreas: `
          "Scout"
          "Soldier"
          "Pyro"
          "Demoman"
          "Heavy"
          "Engineer"
          "Medic"
          "Sniper"
          "Spy"
        `,
      },

      '&.bball': {
        gridTemplateAreas: `
          "Soldier"
        `,
      },

      '&.ultiduo': {
        gridTemplateAreas: `
          "Soldier"
          "Medic"
        `,
      },

      [breakpoints.up('tablet')]: {
        '&.6v6, &.9v9, &.ultiduo': { gridTemplateColumns: '1fr 1fr' },

        '&.6v6': {
          gridTemplateAreas: `
          "Scout" "Soldier"
          "Demoman" "Medic"
        `,
        },

        '&.9v9': {
          gridTemplateAreas: `
          "Scout" "Soldier"
          "Pyro" "Demoman"
          "Heavy" "Engineer"
          "Medic" "Sniper"
          "Spy" "Spy"
        `,
        },

        '&.ultiduo': {
          gridTemplateAreas: `
          "Soldier" "Medic"
        `,
        },
      },

      [breakpoints.up('desktop')]: {
        '&.6v6': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `
          "Scout" "Soldier" "Demoman" "Medic"
        `,
        },

        '&.9v9': {
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `
          "Scout" "Soldier" "Pyro"
          "Demoman" "Heavy" "Engineer"
          "Medic" "Sniper" "Spy"
        `,
        },
      },
    },

    slot: { margin: 12 },
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.container} ${this.props.gamemode}`}>
        {this.renderCards()}
      </div>
    );
  }
}

export default injectSheet(Classes.styles)(Classes);
