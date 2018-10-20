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

type ConnectedProps = {| region: $Keys<typeof regions> | null |};
type OwnProps = {
  userId: string, // eslint-disable-line react/no-unused-prop-types
  classes: { title: string },
};

const styles = {
  title: {
    fontWeight: 600,
    marginRight: 4,
  },
};

function Region(props: OwnProps & ConnectedProps) {
  return (
    <span>
      <span className={props.classes.title}>Region:</span>

      {props.region === null ? '' : regions[props.region].fullName}
    </span>
  );
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getRegion = makeGetRegion();

  return (state, props) => {
    return { region: getRegion(state, props.userId) };
  };
};

export default injectSheet(styles)(connect(makeMapStateToProps)(Region));
