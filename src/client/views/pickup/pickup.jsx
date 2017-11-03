import React, { PureComponent } from 'react';
import injectSheet, { withTheme } from 'react-jss';
import { breakpoints } from 'materialize-react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import ClassList from './class-list';

const minmax = 'minmax(240px, 360px) ';

/**
 * Render the classes for the current gamemode.
 *
 * @class
 */
class Pickup extends PureComponent {
  static propTypes = {
    gamemode: PropTypes.string.isRequired,
    pickup: PropTypes.shape({}).isRequired,
    classes: PropTypes.shape({ classContainer: PropTypes.string }).isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = { user: null };

  static styles = {
    classContainer: {
      display: 'grid',
      gridGap: '16px',
      boxSizing: 'border-box',

      [breakpoints.down('tablet')]: { width: '100%' },

      [breakpoints.up('mobile')]: { gridTemplateColumns: '1fr' },

      [breakpoints.up('tablet')]: { gridTemplateColumns: '1fr 1fr' },

      [breakpoints.up('desktop')]: {
        '&[data-gamemode="6v6"]': { gridTemplateColumns: 'minmax(240px, 300px) '.repeat(5) },

        '&[data-gamemode="9v9"]': { gridTemplateColumns: minmax.repeat(3) },

        '&[data-gamemode="ultiduo"]': { gridTemplateColumns: minmax.repeat(2) },
      },

      '&[data-gamemode="bball"]': { gridTemplateColumns: 'minmax(736px, 1fr)' },
    },
  };

  /**
   * Render the class list with the players.
   *
   * @returns {JSX[]} - Returns the JSX.
   */
  renderClasses() {
    const {
      gamemode,
      user,
      pickup,
    } = this.props;

    return Object
      .keys(gamemodes[gamemode].slots)
      .map((slot) => {
        const players = get(pickup, `classes.${slot}`, []);

        return (
          <ClassList
            key={slot}
            slotName={slot}
            players={players}
            gamemode={gamemode}
            user={user}
          />
        );
      });
  }

  render() {
    return (
      <div
        className={this.props.classes.classContainer}
        data-gamemode={this.props.gamemode}
      >
        {this.renderClasses()}
      </div>
    );
  }
}

export default injectSheet(Pickup.styles)(withTheme(Pickup));
