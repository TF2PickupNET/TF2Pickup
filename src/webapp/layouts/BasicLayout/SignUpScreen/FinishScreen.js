// @flow

import React from 'react';
import {
  Row,
  Button,
} from 'antd';
import injectSheet from 'react-jss';

type State = { isProcessing: boolean };
type Props = {
  nextStep: () => void,
  classes: { text: string },
};

const styles = { text: { textAlign: 'center' } };

class FinishScreen extends React.PureComponent<Props, State> {
  handleFinishClick = () => {
    this.props.nextStep();
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
          <Button onClick={this.handleFinishClick}>
            Let&apos;s go
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(FinishScreen);
