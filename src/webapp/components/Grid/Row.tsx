import React, {ReactNode} from 'react';
import injectSheet from 'react-jss';
import {isString} from "../../../utils/string";

interface Props {
  dir?: 'column' | 'row',
  justify?: 'space-between' | 'space-around' | 'start' | 'center' | 'end',
  align?: 'start' | 'center' | 'end',
  children: ReactNode,
  classes: { row: string },
  className?: string,
  inline?: boolean,
}

const styles = {
  row: {
    display: (props: Props) => props.inline ? 'inline-flex' : 'flex',
    flexDirection: (props: Props) => props.dir,
    alignItems(props: Props) {
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
    justifyContent(props: Props) {
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

function Row(props: Props) {
  return (
    <div className={`${props.classes.row} ${props.className}`}>
      {props.children}
    </div>
  );
}

Row.defaultProps = { className: '' };

export default injectSheet<Props>(styles)(Row);
