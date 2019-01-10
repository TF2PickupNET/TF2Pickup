import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  title: {
    padding: '8px 16px',
    fontWeight: 600,
    display: 'inline',
  },
};

interface Props extends WithStyles<typeof styles> {
  title: ReactNode,
}

function Title(props: Props) {
  return (
    <h4 className={props.classes.title}>
      {props.title}
    </h4>
  );
}

export default withStyles(styles)(Title);
