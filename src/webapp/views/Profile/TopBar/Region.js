// @flow

import React from 'react';
import injectSheet from 'react-jss';

import { makeGetRegion } from '../../../store/users/selectors';
import { regions } from '../../../../config';
import { useMakeMapState } from '../../../utils/use-store';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  userId: string,
  classes: { title: string },
};

const styles = {
  title: {
    fontWeight: 600,
    marginRight: 4,
  },
};
const makeMapState = () => {
  const getRegion = makeGetRegion();

  return (state, props) => {
    return { region: getRegion(state, props.userId) };
  };
};

function Region(props: Props) {
  const { region } = useMakeMapState(makeMapState, props);

  return (
    <span>
      <span className={props.classes.title}>Region:</span>

      {region === null ? '' : regions[region].fullName}
    </span>
  );
}

export default injectSheet(styles)(Region);
