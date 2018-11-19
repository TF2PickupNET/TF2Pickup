// @flow

import React from 'react';
import injectSheet from 'react-jss';

import { makeGetRegion } from '../../../store/users/selectors';
import { regions } from '../../../../config';
import { useMakeMapState } from '../../../utils/use-store';
import { useMatch } from '../../../utils/use-router';
import { isString } from '../../../../utils/string';

type Props = { classes: { title: string } };

const styles = {
  title: {
    fontWeight: 600,
    marginRight: 4,
  },
};
const makeMapState = () => {
  const getRegion = makeGetRegion();

  return (state, userId) => {
    return { region: getRegion(state, userId) };
  };
};

function Region(props: Props) {
  const userId = useMatch(match => match.params.userId);
  const { region } = useMakeMapState(makeMapState, isString(userId) ? userId : null);

  return (
    <span>
      <span className={props.classes.title}>Region:</span>

      {region === null ? '' : regions[region].fullName}
    </span>
  );
}

export default injectSheet(styles)(Region);
