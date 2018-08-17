// @flow

import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Row,
  Col,
  Steps,
} from 'antd';

import { type User } from '../../../../types';

import AcceptRulesScreen from './AcceptRulesScreen';
import RegionSelectScreen from './RegionSelectScreen';

type Props = {
  user: User,
  children: Node,
  classes: {
    container: string,
    contentContainer: string,
  },
};
type State = { hasFinished: boolean };

const { Step } = Steps;
const steps = [AcceptRulesScreen, RegionSelectScreen];
const styles = {
  container: { height: '100vh' },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

class SignUpScreen extends React.PureComponent<Props, State> {
  static renderSteps(currentStep) {
    const index = steps.findIndex(step => step === currentStep);

    return (
      <Steps current={index}>
        {steps.map(step => (
          <Step
            key={step.NAME}
            title={step.TITLE}
          />
        ))}
      </Steps>
    );
  }

  state = { hasFinished: false };

  getCurrentStep() {
    if (!this.props.user.hasAcceptedTheRules) {
      return AcceptRulesScreen;
    } else if (this.props.user.region === null) {
      return '';
    } else if (this.props.user.name === null) {
      return '';
    } else if (!this.state.hasFinished) {
      return '';
    }

    return null;
  }

  render() {
    const CurrentStep = this.getCurrentStep();

    if (CurrentStep === null) {
      return this.props.children;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Col
          xs={20}
          md={12}
          lg={8}
        >
          {SignUpScreen.renderSteps(CurrentStep)}

          <div className={this.props.classes.contentContainer}>
            <CurrentStep />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default injectSheet(styles)(
  connect(mapStateToProps)(SignUpScreen)
);
