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
        '&.gamemode-6v6': { gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' },

        '&.gamemode-9v9': { gridTemplateColumns: '1fr 1fr 1fr' },

        '&.gamemode-ultiduo': { gridTemplateColumns: '1fr 1fr' },
      },

      '&.gamemode-bball': { gridTemplateColumns: '1fr' },

      // eslint-disable-next-line
      '@media screen and (max-width: 1500px) and (min-width: 1024px)': {
        '&.gamemode-6v6': { gridTemplateColumns: '1fr 1fr 1fr' },
        // eslint-disable-next-line
      },
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
