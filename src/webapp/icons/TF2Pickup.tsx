import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

interface OwnProps {
  size: number;
  color: string;
}

const styles = {
  container: {
    display: 'inline-grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: (props: OwnProps) => props.size / 8,
    width: (props: OwnProps) => props.size,
    height: (props: OwnProps) => props.size,
    transform: 'rotate(12deg)',
  },

  corner: {
    position: 'absolute',
    display: 'inline',
    boxSizing: 'border-box',
    borderRadius: '50%',
    width: (props: OwnProps) => props.size,
    height: (props: OwnProps) => props.size,
    borderColor: (props: OwnProps) => props.color,
    borderWidth: (props: OwnProps) => props.size / 4,
    borderStyle: 'solid',
  },

  cornerContainer: {
    position: 'relative',
    overflow: 'hidden',
  },

  topLeft: {
    left: 0,
    top: 0,
  },

  topRight: {
    right: 0,
    top: 0,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
  },
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function TF2Pickup(props: Props) {
  return (
    <span className={props.classes.container}>
    <span className={props.classes.cornerContainer}>
      <span className={`${props.classes.corner} ${props.classes.topLeft}`} />
    </span>

    <span className={props.classes.cornerContainer}>
      <span className={`${props.classes.corner} ${props.classes.topRight}`} />
    </span>

    <span className={props.classes.cornerContainer}>
      <span className={`${props.classes.corner} ${props.classes.bottomLeft}`} />
    </span>

    <span className={props.classes.cornerContainer}>
      <span className={`${props.classes.corner} ${props.classes.bottomRight}`} />
    </span>
  </span>
  );
}

export default withStyles(styles)(TF2Pickup);
