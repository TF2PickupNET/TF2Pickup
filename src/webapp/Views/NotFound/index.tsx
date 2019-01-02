import React, { useCallback } from 'react';
import Button from '@atlaskit/button';
import injectSheet, { Classes } from 'react-jss';
import { ContextRouter } from 'react-router-dom';

import { Row } from '../../components/Grid';
import DocumentTitle from '../../components/DocumentTitle';

const styles = { buttonContainer: { marginTop: 12 } };

type Props = ContextRouter & Classes<typeof styles>;

function NotFound(props: Props) {
  const handleBack = useCallback(() => {
    props.history.goBack();
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

export default injectSheet<Props>(styles)(NotFound);
