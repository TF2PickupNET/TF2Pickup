import React, { PureComponent } from 'react';
import Aux from 'react-aux';
import PropTypes from 'prop-types';

import app from '../../../app';

import Connect from './connect';
import RconPassword from './rcon-password';
import STVConnect from './stv-connect';

/**
 * A class which fetches the server info from the server and renders the correct components.
 *
 * @class
 */
export default class ServerInfo extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    serverId: PropTypes.number.isRequired,
  };

  state = { server: null };

  /**
   * Initially fetch the server data.
   */
  componentWillMount() {
    this.fetchServerData(this.props.serverId, this.props.status);
  }

  /**
   * If the status of the pickup changes, we want to refetch the server data.
   */
  componentWillReceiveProps(nextProps) {
    this.fetchServerData(nextProps.serverId, nextProps.status);
  }

  /**
   * Update the local server state based on the serverId and the pickup status.
   *
   * @param {Number} serverId - The server id for the pickup.
   * @param {String} status - The status of the pickup.
   */
  async fetchServerData(serverId, status) {
    if (!serverId) {
      return;
    }

    console.log(serverId, status);

    if (status === 'game-is-live' || status === 'waiting-for-game-to-start') {
      const server = await app.service('server').get(serverId);

      console.log(server);

      this.setState({ server });
    } else {
      this.setState({ server: null });
    }
  }

  render() {
    if (!this.state.server) {
      return null;
    }

    return (
      <Aux>
        {this.state.server.password ? (
          <Connect
            ip={this.state.server.ip}
            port={this.state.server.port}
            password={this.state.server.password}
          />
        ) : null}

        <STVConnect
          ip={this.state.server.ip}
          stvPort={this.state.server.stvPort}
        />

        {this.state.server.rconPassword ? (
          <RconPassword
            ip={this.state.server.ip}
            port={this.state.server.port}
            rconPassword={this.state.server.rconPassword}
          />
        ) : null}
      </Aux>
    );
  }
}

