// @flow

import React, { type ComponentType } from 'react';
import injectSheet from 'react-jss';
import { Steps } from 'antd';

import steps from './steps';

type Props = {
  component: ComponentType<{}>,
  index: number,
  classes: {
    contentContainer: string,
    stepperContainer: string,
    stepper: string,
  },
};

const { Step } = Steps;
const styles = {
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

function Stepper(props: Props) {
  const Component = props.component;

  return (
    <div className={props.classes.stepperContainer}>
      <Steps
        current={props.index}
        direction="vertical"
        className={props.classes.stepper}
      >
        {steps.map(step => (
          <Step
            key={step.name}
            title={step.display}
            description={step.description}
          />
        ))}
      </Steps>

      <div className={props.classes.contentContainer}>
        <Component />
      </div>
    </div>
  );
}

export default injectSheet(styles)(Stepper);
