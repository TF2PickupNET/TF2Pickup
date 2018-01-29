import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  Spinner,
  Card,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { pluck } from '@tf2-pickup/utils';

import app from '../../app';
import playSound from '../../utils/play-sound';
import { getPlayer } from '../../../utils/pickup';

import Info from './info';
import ServerInfo from './server-info';
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

  state = {
    pickup: null,
    isLoading: true,
  };

  /**
   * Get the initial pickup and setup the event listener.
   */
  async componentWillMount() {
    const service = app.service('pickup');

    try {
      const pickup = await service.get(this.id);

      service.on('patched', this.handlePickupUpdate);

      this.setState({ pickup });
    } finally {
      this.setState({ isLoading: false });
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
    return parseInt(this.props.match.params.id, 10);
  }

  /**
   * Update the state when the patched event get's fired.
   */
  handlePickupUpdate = (data) => {
    if (this.id === data.id) {
      if (
        this.state.pickup.status !== 'waiting-for-game-to-start'
        && data.status === 'waiting-for-game-to-start'
        && this.props.announcer
        && getPlayer(this.props.userId)(data)
      ) {
        playSound(`${this.props.announcer}/gamestart`);
      }

      this.setState({ pickup: data });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner active />
      );
    }

    if (!this.state.pickup) {
      return (
        <Card>
          <Helmet>
            <title>Not Found</title>
          </Helmet>

          <Card.Header>
            Pickup with the id {this.id} doesn&apos;t exists
          </Card.Header>

          <Card.Content>
            Please go back to the future you came from and come back later
          </Card.Content>
        </Card>
      );
    }

    return (
      <div className={this.props.classes.container}>
        <Helmet>
          <title>
            {`Pickup ${this.state.pickup.id}`}
          </title>
        </Helmet>

        <Info pickup={this.state.pickup} />

        <ServerInfo
          status={this.state.pickup.status}
          serverId={this.state.pickup.serverId}
        />

        <Teams
          teams={this.state.pickup.teams}
          scores={this.state.pickup.scores}
        />

        <Actions pickup={this.state.pickup} />
      </div>
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
