// @flow

import React from 'react';
import injectSheet from 'react-jss';

import Warning from '../Warning';

type Props = {
  warningIds: $ReadOnlyArray<string>,
  classes: {
    container: string,
    warning: string,
  },
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },

  warning: { width: '25%' },
};

function Warnings(props: Props) {
  return (
    <div className={props.classes.container}>
      {props.warningIds.map(id => (
        <Warning
          key={id}
          id={id}
          className={props.classes.warning}
        />
      ))}
    </div>
  );
}

export default injectSheet(styles)(Warnings);
