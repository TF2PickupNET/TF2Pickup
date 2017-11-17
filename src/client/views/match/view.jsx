import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Aux from 'react-aux';
import { connect } from 'react-redux';
import { Spinner } from 'materialize-react';
import injectSheet from 'react-jss';

import app from '../../app';

import Info from './info/info';
import Connect from './info/connect';
import StvConnect from './info/stv-connect';
import RconPassword from './info/rcon-password';
import Teams from './teams';

class View extends PureComponent {
  static styles = {
    container: {
      width: '100%',
      maxWidth: 1024,
    },
  };

  state = { pickup: null };

  async componentWillMount() {
    const pickup = await app.service('pickup').get(this.id);

    this.setState({ pickup });

    app
      .service('pickup')
      .on('patched', this.handlePickupUpdate);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      const pickup = await app.service('pickup').get(this.id);

      this.setState({ pickup });
    }
  }

  componentWillUnmount() {
    app
      .service('pickup')
      .removeListener('patched', this.handlePickupUpdate);
  }

  get id() {
    return this.props.match.params.id;
  }

  handlePickupUpdate = (data) => {
    console.log(data);
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
              teams={{
                red: {
                  scout: ['1', '2'],
                  roamer: ['1'],
                  pocket: ['1'],
                  demoman: ['1'],
                  medic: ['1'],
                },
              }}
              scores={this.state.pickup.score}
            />
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
