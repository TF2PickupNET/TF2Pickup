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

import {
  getCurrentUser,
  getCurrentUserId,
} from '../../../store/user-id/selectors';
import { getSettings } from '../../../store/settings/selectors';
import { makeGetProfileById } from '../../../store/user-profiles/selectors';
import { useMakeMapState } from '../../../utils/use-store';

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

const makeMapState = () => {
  const getProfileById = makeGetProfileById();

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      userId,
      config: state.config !== null,
      user: getCurrentUser(state) !== null,
      settings: getSettings(state) !== null,
      profile: getProfileById(state, userId) !== null,
    };
  };
};

function LoadingScreen(props: Props) {
  const [currentStep, setCurrentStep] = useState<$Keys<typeof steps>>('load-configuration');
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const state = useMakeMapState(makeMapState);

  const handleTransitionEnd = useCallback(() => {
    if (steps[currentStep].next === null) {
      setIsLoading(false);
    } else {
      setCurrentStep(steps[currentStep].next);
      setIsFinished(false);
    }
  }, [currentStep]);

  useEffect(() => {
    // $FlowFixMe
    steps[currentStep].handler(state);
  }, [currentStep]);

  useEffect(() => {
    if (steps[currentStep].isFinished(state)) {
      setIsFinished(true);
    }
  }, [props, currentStep, state]);

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
            status="active"
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
