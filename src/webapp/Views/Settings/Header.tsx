import React, { ReactNode } from 'react';
import injectSheet, { Classes } from 'react-jss';

import { useMakeMapState } from '../../store/use-store';
import { State } from '../../store';

type Selector = (state: State) => string | null;

const styles = {
  title: {
    maxWidth: '33%',
    padding: '0 8px',
    fontWeight: 600,
    flex: 1,
  },

  value: { padding: '0 8px' },
};

const makeMapState = () => (state: State, selector: Selector) => {
  return { value: selector(state) };
};

interface Props extends Classes<typeof styles> {
  selector: Selector,
  title: ReactNode,
}

function Title(props: Props) {
  const { value } = useMakeMapState(makeMapState, props.selector);

  return (
    <React.Fragment>
      <span className={props.classes.title}>
        {props.title}
      </span>

      <span className={props.classes.value}>
        {value}
      </span>
    </React.Fragment>
  );
}

export default injectSheet<Props>(styles)(Title);
