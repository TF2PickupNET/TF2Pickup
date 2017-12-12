import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { breakpoints } from 'materialize-react';

import {
  map,
  pipe,
  pluck,
  arrayToObject,
} from '../../../../utils/functions';
import { getGamemodeFromUrl } from '../../../../utils/pickup';
import { updatePickups } from '../../../redux/pickup-queue/actions';
import app from '../../../app';

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
    connected: PropTypes.bool.isRequired,
    updatePickups: PropTypes.func.isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    pickup: null,
    user: null,
  };

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
   * Update the pickups when the component mounts.
   */
  componentWillMount() {
    this.updatePickups(this.getRegion(this.props.user));
  }

  /**
   * Update the pickups when the user reconnects or the user changes the region.
   */
  componentWillReceiveProps(nextProps) {
    const currentRegion = this.getRegion(this.props.user);
    const nextRegion = this.getRegion(nextProps.user);

    if (nextProps.connected && !this.props.connected) {
      this.updatePickups(nextRegion);
    }

    if (currentRegion !== nextRegion) {
      this.updatePickups(nextRegion);
    }
  }

  getRegion = pluck('settings.region', 'eu');

  /**
   * Fetch the pickups for the passed region.
   *
   * @param {String} region - The regions name.
   */
  async updatePickups(region) {
    const pickups = await app.service('pickup-queue').find({ query: { region } });

    this.props.updatePickups(arrayToObject(pickup => pickup.gamemode)(pickups));
  }

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
        className={classnames(
          this.props.classes.classContainer,
          `gamemode-${this.props.pickup.gamemode}`,
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
      pickup: pluck(gamemode, null)(state.pickupQueue),
      user: state.user,
      connected: state.connected,
    };
  },
  (dispatch) => {
    return {
      updatePickups(pickups) {
        return dispatch(updatePickups(pickups));
      },
    };
  },
)(injectSheet(Classes.styles)(Classes));
