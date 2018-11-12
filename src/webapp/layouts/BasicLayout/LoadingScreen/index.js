// @flow

import React, {
  type Node,
  useState,
  useCallback,
  useEffect,
} from 'react';
import injectSheet from 'react-jss';
import {
  Row,
  Col,
  Progress,
} from 'antd';
import Helmet from 'react-helmet';

import steps from './steps';

type Props = {
  classes: {
    container: string,
    text: string,
  },
  children: Node,
};

const styles = {
  container: { minHeight: '100vh' },

  text: { textAlign: 'center' },
};

function useStepper() {
  const [currentStep, setCurrentStep] = useState<$Keys<typeof steps>>('load-configuration');
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState(null);

  const nextStep = useCallback(() => {
    if (steps[currentStep].next === null) {
      setIsLoading(false);
    } else {
      setCurrentStep(steps[currentStep].next);
      setIsFinished(false);
    }
  }, [currentStep]);

  useEffect(async () => {
    if (currentStep === null) {
      return;
    }

    try {
      await steps[currentStep].handler();

      setIsFinished(true);
    } catch (error) {
      setError(error);
    }
  }, [currentStep]);

  return {
    currentStep,
    isFinished,
    isLoading,
    err,
    nextStep,
  };
}

function LoadingScreen(props: Props) {
  const {
    currentStep,
    isFinished,
    isLoading,
    err,
    nextStep,
  } = useStepper();

  const handleTransitionEnd = useCallback(() => nextStep(), [nextStep]);
  const percentage = isFinished ? steps[currentStep].end : steps[currentStep].start;

  if (isLoading) {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={props.classes.container}
      >
        <Helmet>
          <title>Loading...</title>
        </Helmet>

        <Col
          xs={20}
          md={12}
          lg={8}
        >
          <Progress
            percent={percentage}
            status={err ? 'exception' : 'active'}
            onTransitionEnd={handleTransitionEnd}
          />

          <p className={props.classes.text}>
            {steps[currentStep].text}
          </p>
        </Col>
      </Row>
    );
  }

  return props.children;
}

export default injectSheet(styles)(LoadingScreen);
