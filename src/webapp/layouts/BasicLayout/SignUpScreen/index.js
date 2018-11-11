// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  Row,
  Col,
} from 'antd';
import Helmet from 'react-helmet';

import { getCurrentUser } from '../../../store/user-id/selectors';
import { useMapState } from '../../../utils/use-store';

import Stepper from './Stepper';
import steps from './steps';

type Props = {
  children: Node,
  classes: {
    container: string,
    header: string,
  },
};

const styles = {
  container: { height: '100vh' },

  header: {
    textAlign: 'center',
    marginBottom: 25,
  },
};

function getCurrentStep(user) {
  if (user.hasCompletedSignUp) {
    return null;
  }

  if (!user.hasAcceptedTheRules) {
    return steps[0];
  } else if (user.region === null) {
    return steps[1];
  } else if (user.name === null) {
    return steps[2];
  } else if (!user.hasCompletedSignUp) {
    return steps[4];
  }

  return null;
}

const mapState = (state) => {
  return { user: getCurrentUser(state) };
};

function SignUpScreen(props: Props) {
  const { user } = useMapState(mapState);

  if (user === null) {
    return null;
  }

  const currentStep = getCurrentStep(user);

  if (currentStep === null) {
    return props.children;
  }

  const index = steps.findIndex(step => step === currentStep);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className={props.classes.container}
    >
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <Col
        md={20}
        lg={16}
      >
        <h2 className={props.classes.header}>
          Please fill out some information before you can start playing
        </h2>

        <Stepper
          index={index}
          component={currentStep.component}
          steps={steps}
        />
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(SignUpScreen);
