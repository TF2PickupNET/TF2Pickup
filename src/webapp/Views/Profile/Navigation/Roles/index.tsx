import React, { useContext } from 'react';
import { useMakeMapState, State } from '@webapp/store';
import { UserIdContext } from '@webapp/Views/Profile';
import { makeGetSortedRoles } from '@webapp/store/users/selectors';
import Role from '@webapp/Views/Profile/Navigation/Roles/Role';
import { Container } from '@webapp/components/Grid';

const makeMapState = () => {
  const getUserRoles = makeGetSortedRoles();

  return (state: State, userId: string) => {
    return { roles: getUserRoles(state, userId) };
  };
};

function Roles() {
  const userId = useContext(UserIdContext);
  const { roles } = useMakeMapState(makeMapState, userId);

  return (
    <Container>
      {roles.map(role => (
        <Role
          key={role}
          isRemovable
          role={role}
        />
      ))}

      <Role
        role="user"
        isRemovable={false}
      />
    </Container>
  );
}

export default Roles;
