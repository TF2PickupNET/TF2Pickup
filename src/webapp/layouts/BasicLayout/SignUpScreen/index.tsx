import React, {ReactNode} from 'react';
import injectSheet, {Classes} from 'react-jss';

import { getCurrentUser } from '../../../store/user-id/selectors';
import { useMapState } from '../../../store/use-store';

import Stepper from './Stepper';
import steps from './steps';
import {Row, Column} from "../../../components/Grid";
import User from "../../../../types/User";
import {State} from "../../../store";
import DocumentTitle from '../../../components/DocumentTitle';

const styles = {
  container: {
    height: '100vh',
    padding: '15% 64px',
  },

  header: {
    textAlign: 'center',
    marginBottom: 25,
  },
};

function getCurrentStep(user: User) {
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
    return steps[3];
  }

  return null;
}

const mapState = (state: State) => {
  return { user: getCurrentUser(state) };
};

interface Props extends Classes<typeof styles> {
  children: ReactNode,
}

function SignUpScreen(props: Props) {
  const { user } = useMapState(mapState);

  if (user === null) {
    return null;
  }

  const currentStep = getCurrentStep(user);

  if (currentStep === null) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  const index = steps.findIndex(step => step === currentStep);

  return (
    <Row
      justify="center"
      className={props.classes.container}
    >
      <DocumentTitle title="Sign Up" />

      <Column col={16}>
        <h2 className={props.classes.header}>
          Please fill out some information before you can start playing
        </h2>

        <Stepper
          index={index}
          component={currentStep.component}
        />
      </Column>
    </Row>
  );
}

export default injectSheet<Props>(styles)(SignUpScreen);