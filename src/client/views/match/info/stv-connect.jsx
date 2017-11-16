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
      stvPort,
      stvPassword,
    } = this.props.pickup.server;

    return `connect ${ip}:${stvPort}; password ${stvPassword}`;
  }

  render() {
    return (
      <Card className={this.props.classes.card}>
        <span className={this.props.classes.item}>
          {this.getConnect()}
        </span>

        <span className={this.props.classes.button}>
          <Button>
            Join STV
          </Button>
        </span>
      </Card>
    );
  }
}

export default injectSheet(Info.styles)(Info);
