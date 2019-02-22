import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';
import { completeSignUp } from '../../store/users/actions';
import useAsync from '../../utils/use-async';
import { Row } from '../Grid';
import { useActions } from '../../store';

const styles = { text: { textAlign: 'center' } };

type Props = WithStyles<typeof styles>;

function FinishScreen(props: Props) {
  const actions = useActions({ completeSignUp });
  const {
    isLoading,
    run: handleFinishClick,
  } = useAsync(async () => {
    await actions.completeSignUp();
  });

  return (
    <React.Fragment>
      <p className={props.classes.text}>
        Congrats you are finished.
        Have fun playing.
      </p>

      <Row justify="center">
        <Button
          isLoading={isLoading}
          appearance="primary"
          onClick={handleFinishClick}
        >
          Let&apos;s go
        </Button>
      </Row>
    </React.Fragment>
  );
}

export default withStyles(styles)(FinishScreen);