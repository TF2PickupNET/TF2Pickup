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
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [hasError, setHasError] = useState(false);

  const nextStep = useCallback(() => {
    if (hasError) {
      return;
    }

    if (steps[currentStep].next === null) {
      setIsLoading(false);
    } else {
      setCurrentStep(steps[currentStep].next);
    }
  }, [currentStep, hasError]);

  useEffect(async () => {
    if (currentStep === null) {
      return;
    }

    try {
      await steps[currentStep].handler();

      setPercentage(steps[currentStep].end);
    } catch (error) {
      setHasError(error);
    }
  }, [currentStep]);

  return {
    currentStep,
    isLoading,
    nextStep,
    hasError,
    percentage,
  };
}

function LoadingScreen(props: Props) {
  const {
    currentStep,
    percentage,
    isLoading,
    nextStep,
    hasError,
  } = useStepper();

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
            status={hasError ? 'exception' : 'active'}
            onTransitionEnd={nextStep}
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
