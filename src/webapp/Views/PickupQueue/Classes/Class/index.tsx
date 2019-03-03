import React from 'react';
import ClassHeader from '@webapp/Views/PickupQueue/Classes/Class/Header';
import classes from '@config/classes';
import withStyles, { WithStyles } from 'react-jss';
import { Container } from '@webapp/components/Grid';

const styles = {
  classContainer: {
    minWidth: 240,
  },
};

interface Props extends WithStyles<typeof styles> {
  className: keyof typeof classes,
}

function Class(props: Props) {
  return (
    <Container
      dir="column"
      className={props.classes.classContainer}
    >
      <ClassHeader className={props.className} />
    </Container>
  );
}

export default withStyles(styles)(Class);
