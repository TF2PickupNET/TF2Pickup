import React, { useCallback } from 'react';
import Button from '@atlaskit/button';
import withStyles, { WithStyles } from 'react-jss';
import { Row } from '@webapp/components/Grid';
import DocumentTitle from '@webapp/components/DocumentTitle';

const styles = { buttonContainer: { marginTop: 12 } };

interface Props extends WithStyles<typeof styles> {
  default: true,
}

function NotFound(props: Props) {
  console.log(props);
  const handleBack = useCallback(() => {
    // Props.history.goBack();
  }, []);

  return (
    <React.Fragment>
      <DocumentTitle title="Not Found" />

      <Row justify="center">
        <h2>Not Found</h2>
        <div>
          We couldn't find what you are looking for.
        </div>

        <Row
          inline
          justify="end"
          className={props.classes.buttonContainer}
        >
          <Button onClick={handleBack}>
            Go Back
          </Button>
        </Row>
      </Row>
    </React.Fragment>
  );
}

export default withStyles(styles)(NotFound);
