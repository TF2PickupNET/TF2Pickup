import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Aux from 'react-aux';
import { connect } from 'react-redux';
import { Spinner } from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import app from '../../app';

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
    user: PropTypes.shape({}),
  };

  static defaultProps = { user: null };

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
    const pickup = await service.get(this.id);

    this.setState({ pickup });

    service.on('patched', this.handlePickupUpdate);
  }

  /**
   * When the users object changes, we refetch the pickup.
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
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
    this.setState({ pickup: data });
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
    return { user: state.user };
  },
)(injectSheet(View.styles)(View));
