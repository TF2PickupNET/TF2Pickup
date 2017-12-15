import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { breakpoints } from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

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
    gamemode: PropTypes.string.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = { id: null };

  static styles = {
    classContainer: {
      display: 'grid',
      gridGap: '16px',
      boxSizing: 'border-box',

      [breakpoints.down('tablet')]: { width: '100%' },

      [breakpoints.up('mobile')]: { gridTemplateColumns: '1fr' },

      [breakpoints.up('tablet')]: { gridTemplateColumns: '1fr 1fr' },

      [breakpoints.up('desktop')]: {
        '&.gamemode-6v6': { gridTemplateColumns: 'minmax(240px, 300px) '.repeat(5) },

        '&.gamemode-9v9': { gridTemplateColumns: minmax.repeat(3) },

        '&.gamemode-ultiduo': { gridTemplateColumns: minmax.repeat(2) },
      },

      '&.gamemode-bball': { gridTemplateColumns: 'minmax(736px, 1fr)' },
    },
  };

  /**
   * Render the class list with the players.
   *
   * @returns {JSX[]} - Returns the JSX.
   */
  renderClasses() {
    return pipe(
      Object.keys,
      map(className => (
        <ClassList
          key={className}
          className={className}
          gamemode={this.props.gamemode}
        />
      )),
    )(gamemodes[this.props.gamemode].slots);
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    return (
      <div
        className={classnames(
          this.props.classes.classContainer,
          `gamemode-${this.props.gamemode}`,
        )}
      >
        {this.renderClasses()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);

    return {
      gamemode,
      id: pluck(`${gamemode}.id`)(state.pickupQueue),
    };
  },
)(injectSheet(Classes.styles)(Classes));
