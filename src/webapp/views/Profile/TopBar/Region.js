// @flow

import React from 'react';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import injectSheet from 'react-jss';

import { makeGetRegion } from '../../../store/users/selectors';
import { regions } from '../../../../config';
import { type State } from '../../../store';

type Props = {
  region: $Keys<typeof regions> | null,
  userId: string, // eslint-disable-line react/no-unused-prop-types
  classes: { title: string },
};

const styles = {
  title: {
    fontWeight: 600,
    marginRight: 4,
  },
};

function Region(props: Props) {
  return (
    <span>
      <span className={props.classes.title}>Region:</span>

      {props.region === null ? '' : regions[props.region].fullName}
    </span>
  );
}

const makeMapStateToProps = (): MapStateToProps<State, Props> => {
  const getRegion = makeGetRegion();

  return (state: State, props: Props) => {
    return { region: getRegion(state, props.userId) };
  };
};

export default injectSheet(styles)(connect(makeMapStateToProps)(Region));
