import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Button from '@atlaskit/button';
import { completeSignUp } from '@webapp/store/users/actions';
import useAsync from '@webapp/utils/use-async';
import { Container } from '@webapp/components/Grid';
import { useActions } from '@webapp/store';

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

      <Container justify="center">
        <Button
          isLoading={isLoading}
          appearance="primary"
          onClick={handleFinishClick}
        >
          Let&apos;s go
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default withStyles(styles)(FinishScreen);
