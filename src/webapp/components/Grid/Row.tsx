import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { isString } from '@utils/string';

interface OwnProps {
  dir?: 'column' | 'row',
  justify?: 'space-between' | 'space-around' | 'start' | 'center' | 'end',
  align?: 'start' | 'center' | 'end',
  children: ReactNode,
  className?: string,
  inline?: boolean,
}

const styles = {
  row: {
    display: (props: OwnProps) => (props.inline ? 'inline-flex' : 'flex'),
    flexDirection: (props: OwnProps) => props.dir,
    alignItems(props: OwnProps) {
      if (!isString(props.align)) {
        return null;
      }

      switch (props.align) {
        case 'center':
          return 'center';
        default:
          return `flex-${props.align}`;
      }
    },
    justifyContent(props: OwnProps) {
      if (!isString(props.justify)) {
        return null;
      }

      switch (props.justify) {
        case 'center':
        case 'space-around':
        case 'space-between':
          return props.justify;
        default:
          return `flex-${props.justify}`;
      }
    },
  },
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function Row(props: Props) {
  return (
    <div className={`${props.classes.row} ${props.className}`}>
      {props.children}
    </div>
  );
}

Row.defaultProps = { className: '' };

export default withStyles(styles)(Row);
