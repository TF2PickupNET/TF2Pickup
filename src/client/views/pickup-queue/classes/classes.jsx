import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { breakpoints } from 'materialize-react';

import {
  map,
  pipe,
  pluck,
} from '../../../../utils/functions';
import { getGamemodeFromUrl } from '../../../../utils/pickup';

import ClassList from './class-list';

const minmax = 'minmax(240px, 360px) ';

/**
 * The classes for the current gamemode.
 *
 * @class
 */
class Classes extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ classContainer: PropTypes.string }).isRequired,
    pickup: PropTypes.shape({
      gamemode: PropTypes.string,
      classes: PropTypes.shape({}),
    }),
  };

  static defaultProps = { pickup: null };

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
    return pipe(
      Object.entries,
      map(([className, players]) => (
        <ClassList
          key={className}
          players={players}
          className={className}
        />
      )),
    )(this.props.pickup.classes);
  }

  render() {
    if (!this.props.pickup) {
      return null;
    }

    return (
      <div
        className={this.props.classes.classContainer}
        data-gamemode={this.props.pickup.gamemode}
      >
        {this.renderClasses()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);

    return { pickup: pluck(gamemode, null)(state.pickupQueue) };
  },
)(injectSheet(Classes.styles)(Classes));
