// @flow

import React from 'react';
import {
  Row,
  Button,
} from 'antd';

type State = { isProcessing: boolean };
type Props = { nextStep: () => void };

export default class FinishScreen extends React.PureComponent<Props, State> {
  handleFinishClick = () => {
    this.props.nextStep();
  };

  render() {
    return (
      <React.Fragment>
        <p>
          Congrats you are finished.
          Have fun playing.
        </p>

        <Row
          type="flex"
          justify="center"
          align="middle"
        >
          <Button onClick={this.handleFinishClick}>
            Let's go
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}
