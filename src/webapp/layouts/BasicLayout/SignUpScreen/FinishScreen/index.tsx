import React, {useCallback} from 'react';
import injectSheet from 'react-jss';
import Button from '@atlaskit/button';

import { completeSignUp } from '../../../../store/users/actions';
import useAsync from '../../../../utils/use-async';
import {Row} from "../../../../components/Grid";

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

      <Row justify="center">
        <Button
          isLoading={isLoading}
          onClick={handleFinishClick}
          appearance="primary"
        >
          Let&apos;s go
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default injectSheet<Props>(styles)(FinishScreen);
