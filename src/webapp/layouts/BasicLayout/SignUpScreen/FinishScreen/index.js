// @flow

import React, { useCallback } from 'react';
import {
  Row,
  Button,
} from 'antd';
import injectSheet from 'react-jss';

import { completeSignUp } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';

type Props = { classes: { text: string } };

const styles = { text: { textAlign: 'center' } };

function FinishScreen(props: Props) {
  const {
    isLoading,
    run: handleFinishClick,
  } = useAsync(
    useCallback(() => completeSignUp(), []),
  );

  return (
    <React.Fragment>
      <p className={props.classes.text}>
        Congrats you are finished.
        Have fun playing.
      </p>

      <Row
        type="flex"
        justify="center"
        align="middle"
      >
        <Button
          loading={isLoading}
          onClick={handleFinishClick}
        >
          Let&apos;s go
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default injectSheet(styles)(FinishScreen);
