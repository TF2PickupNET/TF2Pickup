import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';

import { isNumber } from '@utils/number';

interface OwnProps {
  col?: number,
  children: ReactNode,
  className?: string,
}

const COLUMNS = 24;
const styles = {
  column: {
    flex: 1,
    maxWidth(props: Props) {
      if (isNumber(props.col)) {
        return `${props.col / COLUMNS * 100}%`;
      }

      return null;
    },
  },
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function Column(props: Props) {
  return (
    <div className={`${props.classes.column} ${props.className}`}>
      {props.children}
    </div>
  );
}

Column.defaultProps = { className: '' };

export default withStyles(styles)(Column);
