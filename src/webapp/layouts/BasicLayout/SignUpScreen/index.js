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
import NameSelectScreen from './NameSelectScreen';

type Props = {
  user: User,
  children: Node,
  classes: {
    container: string,
    contentContainer: string,
  },
};

const { Step } = Steps;
const steps = [{
  name: 'accept-rules',
  display: 'Accept the rules',
  Component: AcceptRulesScreen,
}, {
  name: 'region-select',
  display: 'Select a region',
  Component: RegionSelectScreen,
}, {
  name: 'select-name',
  display: 'Select a name',
  Component: NameSelectScreen,
}];
const styles = {
  container: { height: '100vh' },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '600px',
  },
};

class SignUpScreen extends React.PureComponent<Props> {
  static renderSteps(currentStep) {
    const index = steps.findIndex(step => step === currentStep);

    return (
      <Steps current={index}>
        {steps.map(step => (
          <Step
            key={step.name}
            title={step.display}
          />
        ))}
      </Steps>
    );
  }

  getCurrentStep() {
    if (!this.props.user.hasAcceptedTheRules) {
      return steps[0];
    } else if (this.props.user.region === null) {
      return steps[1];
    } else if (this.props.user.name === null) {
      return steps[2];
    }

    return null;
  }

  render() {
    const currentStep = this.getCurrentStep();

    if (currentStep === null) {
      return this.props.children;
    }

    const { Component } = currentStep;

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Col
          xs={20}
          md={16}
          lg={12}
        >
          {SignUpScreen.renderSteps(currentStep)}

          <div className={this.props.classes.contentContainer}>
            <Component />
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
