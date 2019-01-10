import React, {
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import {
  Row,
  Column,
} from '../../../components/Grid';
import { State } from '../../../store';
import { useMapState } from '../../../store/use-store';
import DocumentTitle from '../../../components/DocumentTitle';

import steps from './steps';

const styles = {
  container: { minHeight: '100vh' },

  text: { textAlign: 'center' },
};

function useStepper() {
  const [currentStep, setCurrentStep] = useState<keyof typeof steps>('load-configuration');
  const [isLoading, setIsLoading] = useState(true);
  const state = useMapState((state1: State) => state1);

  const runStep = useCallback(() => {
    steps[currentStep].handler();
  }, [currentStep]);

  useEffect(() => {
    const isFinished = steps[currentStep].hasFinished(state);

    if (isFinished) {
      const next = steps[currentStep].next as null | keyof typeof steps;

      if (next === null) {
        setIsLoading(false);
      } else {
        setCurrentStep(next);
      }
    }
  }, [state, currentStep]);

  useEffect(() => {
    runStep();
  }, [currentStep]);

  return {
    currentStep,
    isLoading,
    error: steps[currentStep].hasError(state),
    runStep,
  };
}

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function LoadingScreen(props: Props) {
  const {
    currentStep,
    isLoading,
    error,
    runStep,
  } = useStepper();

  if (isLoading) {
    return (
      <Row
        justify="center"
        align="center"
        className={props.classes.container}
      >
        <DocumentTitle title="Loading..." />

        <Column col={8}>
          <Spinner size="large" />

          <p className={props.classes.text}>
            {error ? error.message : steps[currentStep].text}
          </p>

          {error && (
            <p>
              <Button onClick={runStep}>
                Try again
              </Button>
            </p>
          )}
        </Column>
      </Row>
    );
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default withStyles(styles)(LoadingScreen);
