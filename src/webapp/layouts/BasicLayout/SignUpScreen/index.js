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
import JoinDiscordScreen from './JoinDiscordScreen';
import FinishScreen from './FinishScreen';

type Props = {
  user: User,
  children: Node,
  classes: {
    container: string,
    header: string,
    contentContainer: string,
    stepperContainer: string,
    stepper: string,
  },
};
type State = {
  isFinished: boolean,
  didJoinDiscord: boolean,
};

const { Step } = Steps;
const steps = [{
  name: 'accept-rules',
  display: 'Accept the rules',
  description: '',
  Component: AcceptRulesScreen,
}, {
  name: 'region-select',
  display: 'Select a region',
  description: '',
  Component: RegionSelectScreen,
}, {
  name: 'select-name',
  display: 'Select a name',
  description: '',
  Component: NameSelectScreen,
}, {
  name: 'join-discord',
  display: 'Join Discord',
  description: '(Optional)',
  Component: JoinDiscordScreen,
}, {
  name: 'finish',
  display: 'Finish',
  description: '',
  Component: FinishScreen,
}];
const styles = {
  container: { height: '100vh' },

  header: {
    textAlign: 'center',
    marginBottom: 25,
  },

  stepperContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  stepper: { width: 'auto' },

  contentContainer: {
    padding: '0 8px',
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    flex: 1,

    '& > *': { padding: 8 },
  },
};

class SignUpScreen extends React.PureComponent<Props, State> {
  state = {
    isFinished: false,
    didJoinDiscord: false,
  };

  getCurrentStep() {
    if (!this.props.user.hasAcceptedTheRules) {
      return steps[3];
    } else if (this.props.user.region === null) {
      return steps[1];
    } else if (this.props.user.name === null) {
      return steps[2];
    } else if (!this.state.didJoinDiscord) {
      return steps[3];
    } else if (!this.state.isFinished) {
      return steps[4];
    }

    return null;
  }

  nextStep = () => {
    const currentStep = this.getCurrentStep();

    if (currentStep === null) {
      return;
    }

    switch (currentStep.name) {
      case 'join-discord': {
        this.setState({ didJoinDiscord: true });
        break;
      }
      case 'finish': {
        this.setState({ isFinished: true });
        break;
      }
      default: break;
    }
  };

  renderSteps(currentStep) {
    const index = steps.findIndex(step => step === currentStep);

    return (
      <Steps
        current={index}
        direction="vertical"
        className={this.props.classes.stepper}
      >
        {steps.map(step => (
          <Step
            key={step.name}
            title={step.display}
            description={step.description}
          />
        ))}
      </Steps>
    );
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
          md={20}
          lg={16}
        >
          <h2 className={this.props.classes.header}>
            Please fill out some information before you can start playing
          </h2>

          <div className={this.props.classes.stepperContainer}>
            {this.renderSteps(currentStep)}

            <div className={this.props.classes.contentContainer}>
              <Component nextStep={this.nextStep} />
            </div>
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
