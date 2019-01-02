import React, { ComponentType } from 'react';
import injectSheet, {Classes} from 'react-jss';
import { ProgressTracker, Status } from '@atlaskit/progress-tracker';

import steps from './steps';

const styles = {
  stepperContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  stepper: { width: 'auto' },

  contentContainer: {
    padding: '0 8px',
    marginTop: 32,

    '& > *': { padding: 8 },
  },
};

function getStatusForStepIndex(index: number, currentIndex: number): Status {
  if (index === currentIndex) {
    return 'current';
  } else if (index < currentIndex) {
    return 'visited';
  }

  return 'unvisited';
}

interface Props extends Classes<typeof styles> {
  component: ComponentType<any>,
  index: number,
}

function Stepper(props: Props) {
  const Component = props.component;

  const items = steps.map((step, index) => {
    const status = getStatusForStepIndex(index, props.index);

    return {
      ...step,
      noLink: true,
      status,
      percentageComplete: status === 'visited' ? 100 : 0,
    };
  });

  return (
    <div className={props.classes.stepperContainer}>
      <ProgressTracker
        className={props.classes.stepper}
        items={items}
        spacing="comfortable"
      />

      <div className={props.classes.contentContainer}>
        <Component />
      </div>
    </div>
  );
}

export default injectSheet<Props>(styles)(Stepper);
