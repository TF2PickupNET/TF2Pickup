import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import injectSheet from 'react-jss';

class Info extends PureComponent {
  static styles = {
    card: {
      height: 64,
      display: 'grid',
      gridTemplateColumns: '1fr auto',
    },

    item: {
      padding: 16,
      lineHeight: '32px',
      fontSize: 16,
    },

    button: { alignSelf: 'center' },
  };

  getConnect() {
    const {
      ip,
      port,
      password,
    } = this.props.pickup.server;

    return `connect ${ip}:${port}; password ${password}`;
  }

  render() {
    if (!this.props.pickup.server.password) {
      return null;
    }

    return (
      <Card className={this.props.classes.card}>
        <span>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button>
            Join server
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Info.styles)(Info);
