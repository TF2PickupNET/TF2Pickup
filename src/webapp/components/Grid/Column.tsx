import React, { ReactNode } from 'react';
import injectSheet, {Classes} from 'react-jss';

interface OwnProps {
  col?: number,
  children: ReactNode,
  className?: string,
}

const COLUMNS = 24;
const defaultProps: Partial<Props> = {
  col: COLUMNS,
  className: '',
};
const styles = {
  column: {
    flex: 1,
    maxWidth: (props: OwnProps) => `${props.col! / COLUMNS * 100}%`,
  }
};

type Props = OwnProps & Classes<typeof styles>;

function Column(props: Props) {
  return (
    <div className={`${props.classes.column} ${props.className}`}>
      {props.children}
    </div>
  );
}

Column.defaultProps = defaultProps;

export default injectSheet<Props>(styles)(Column);
