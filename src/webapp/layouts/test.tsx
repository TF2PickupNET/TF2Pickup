import React, { ReactNode, FunctionComponent } from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  root: {
    color: 'red',
  },
};

interface Props extends WithStyles<typeof styles> {
  isDisabled: boolean,
  children: ReactNode,
}

const Comp: FunctionComponent<Props> = (props) => {
  console.log(props.classes.root);

  return (
    <button disabled={props.isDisabled} className={props.classes.root}>
      {props.children}
    </button>
  );
};

export default withStyles(styles)(Comp);
