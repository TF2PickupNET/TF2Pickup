import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Aux from 'react-aux';
import { connect } from 'react-redux';
import { Spinner } from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import app from '../../app';
import playSound from '../../utils/play-sound';
import { pluck } from '../../../utils/functions';

import Info from './info/info';
import Connect from './info/connect';
import StvConnect from './info/stv-connect';
import RconPassword from './info/rcon-password';
import Teams from './teams';
import Actions from './actions';

/**
 * The component for the match view.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    userId: PropTypes.string,
    announcer: PropTypes.string,
  };

  static defaultProps = {
    userId: null,
    announcer: null,
  };

  static styles = {
    container: {
      width: '100%',
      maxWidth: 1024,
      display: 'grid',
      gridGap: '24px',
      gridTemplateColumns: '1fr',
    },
  };

  state = { pickup: null };

  /**
   * Get the initial pickup and setup the event listener.
   */
  async componentWillMount() {
    const service = app.service('pickup');

    service.on('patched', this.handlePickupUpdate);

    const pickup = await service.get(this.id);

    this.setState({ pickup });
  }

  /**
   * When the user id changes, the user log in / out we refetch the pickup.
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      const pickup = await app.service('pickup').get(this.id);

      this.setState({ pickup });
    }
  }

  /**
   * Remove the event listener.
   */
  componentWillUnmount() {
    app
      .service('pickup')
      .removeListener('patched', this.handlePickupUpdate);
  }

  /**
   * Get the id of the pickup from the url.
   *
   * @returns {Number} - Returns the id of the pickup.
   */
  get id() {
    return this.props.match.params.id;
  }

  /**
   * Update the state when the patched event get's fired.
   */
  handlePickupUpdate = (data) => {
    this.setState((state) => {
      if (state.pickup.id === data.id) {
        if (
          state.pickup.status !== 'waiting-for-game-to-start'
          && data.status === 'waiting-for-game-to-start'
          && this.props.announcer
        ) {
          playSound(`${this.props.announcer}/gamestart`);
        }

        return { pickup: data };
      }

      return null;
    });
  };

  render() {
    return (
      <Aux>
        <Helmet>
          <title>
            {`Pickup ${this.state.pickup ? this.state.pickup.id : ''}`}
          </title>
        </Helmet>

        {this.state.pickup ? (
          <div className={this.props.classes.container}>
            <Info pickup={this.state.pickup} />

            <Connect pickup={this.state.pickup} />

            <StvConnect pickup={this.state.pickup} />

            <RconPassword pickup={this.state.pickup} />

            <Teams
              teams={this.state.pickup.teams}
              scores={this.state.pickup.scores}
            />

            <Actions pickup={this.state.pickup} />
          </div>
        ) : (
          <Spinner active />
        )}
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    return {
      userId: pluck('id')(state.user),
      announcer: pluck('settings.announcer')(state.user),
    };
  },
)(injectSheet(View.styles)(View));
