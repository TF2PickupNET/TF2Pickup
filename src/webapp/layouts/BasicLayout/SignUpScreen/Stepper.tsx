import React, { ComponentType } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import {
  ProgressTracker,
  Status,
} from '@atlaskit/progress-tracker';

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

interface Props extends WithStyles<typeof styles> {
  component: ComponentType<object>,
  index: number,
}

function Stepper(props: Props) {
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
        <props.component />
      </div>
    </div>
  );
}

export default withStyles(styles)(Stepper);
