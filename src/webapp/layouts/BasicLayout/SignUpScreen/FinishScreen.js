// @flow

import React from 'react';
import {
  Row,
  Button, message,
} from 'antd';
import injectSheet from 'react-jss';

import app from '../../../app';

type State = { isProcessing: boolean };
type Props = { classes: { text: string } };

const styles = { text: { textAlign: 'center' } };

class FinishScreen extends React.PureComponent<Props, State> {
  state = { isProcessing: false };

  isMounted = true;

  componentWillUnmount() {
    this.isMounted = false;
  }

  handleFinishClick = () => {
    this.setState({ isProcessing: true });

    app.io.emit('users:complete-sign-up', {}, (err) => {
      if (err) {
        message.error(`Couldn't finish the sign up: ${err.message}`);
      }

      if (this.isMounted) {
        this.setState({ isProcessing: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <p className={this.props.classes.text}>
          Congrats you are finished.
          Have fun playing.
        </p>

        <Row
          type="flex"
          justify="center"
          align="middle"
        >
          <Button
            loading={this.state.isProcessing}
            onClick={this.handleFinishClick}
          >
            Let&apos;s go
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(FinishScreen);
