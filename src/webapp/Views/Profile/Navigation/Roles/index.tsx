import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

import { makeGetUserRoles } from '../../../../store/users/selectors';
import { State } from '../../../../store';
import { useMakeMapState } from '../../../../store/use-store';
import { useUserId } from '../../utils';

import Role from './Role';
import AddRole from './AddRole';

const makeMapState = () => {
  const getUserRoles = makeGetUserRoles();

  return (state: State, userId: string | null) => {
    return { roles: getUserRoles(state, userId) };
  };
};

const styles = {
  item: {
    width: '100%',
    padding: '4px 12px',
    backgroundColor: 'transparent',
    marginTop: 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
};

type Props = WithStyles<typeof styles>;

function Roles(props: Props) {
  const userId = useUserId();
  const { roles } = useMakeMapState(makeMapState, userId);

  return (
    <span className={props.classes.item}>
      <Role role="user" />

      {roles.map(role => (
        <Role
          key={role}
          role={role}
        />
      ))}

      <AddRole />
    </span>
  );
}

export default withStyles(styles)(Roles);
