import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Column, Row } from '@webapp/components/Grid';

const styles = {
  container: { padding: 32 },
};

interface Props extends WithStyles<typeof styles> {
  path: string,
}

function About(props: Props) {
  return (
    <Row
      justify="center"
      className={props.classes.container}
    >
      <Column col={16}>
        <h3>
          About TF2Pickup
        </h3>
      </Column>
    </Row>
  );
}

export default withStyles(styles)(About);
