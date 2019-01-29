import React, { useCallback, useState } from 'react';
import { colors } from '@atlaskit/theme';
import AddIcon from '@atlaskit/icon/glyph/add';
import withStyles, { WithStyles } from 'react-jss';
import InlineDialog from '@atlaskit/inline-dialog';
import { createSelector } from 'reselect';

import roles from '../../../../../config/roles';
import { State, useMakeMapState } from '../../../../store';
import { hasPermission } from '../../../../../utils/has-permission';
import { makeGetUserById, makeGetUserRoles } from '../../../../store/users/selectors';
import { getCurrentUser } from '../../../../store/user-id/selectors';
import { useUserId } from '../../utils';
import { Keys } from '../../../../../utils/types';

const styles = {
  container: {
    height: 20,
    width: 20,
    borderRadius: '50%',
    backgroundColor: colors.N40,
    margin: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface Props extends WithStyles<typeof styles> {}

const roleNames = Object.keys(roles) as Keys<typeof roles>;

const makeMapState = () => {
  const getUserRoles = makeGetUserRoles();
  const getUserById = makeGetUserById();
  const getRolesToAdd = createSelector(
    getUserRoles,
    userRoles => roleNames.filter(role => !userRoles.includes(role)),
  );

  return (state: State, userId: string | null) => {
    return {
      rolesToAdd: getRolesToAdd(state, userId),
      canAddRole: hasPermission(
        'user.change-role',
        getCurrentUser(state),
        getUserById(state, userId),
      ),
    };
  };
};

function AddRole(props: Props) {
  const userId = useUserId();
  const [isOpen, setIsOpen] = useState(false);
  const {
    canAddRole,
    rolesToAdd,
  } = useMakeMapState(makeMapState, userId);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleClick = useCallback(() => setIsOpen(true), []);

  if (!canAddRole || rolesToAdd.length === 0) {
    return null;
  }

  return (
    <InlineDialog
      onClose={handleClose}
      content={rolesToAdd.map(role => (
        <div>
          {roles[role].display}
        </div>
      ))}
      isOpen={isOpen}
      placement="right-start"
    >
      <span
        className={props.classes.container}
        onClick={handleClick}
      >
        <AddIcon
          size="small"
          label="Add Role"
        />
      </span>
    </InlineDialog>
  );
}

export default withStyles(styles)(AddRole);
