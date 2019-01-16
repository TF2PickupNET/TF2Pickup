import React, { useCallback, ReactNode } from 'react';
import { colors } from '@atlaskit/theme';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import roles from '../../../../../config/roles';
import withStyles, { WithStyles } from 'react-jss';
import { State } from '../../../../store';
import { hasPermission } from '../../../../../utils/has-permission';
import { makeGetUserById } from '../../../../store/users/selectors';
import { getCurrentUser } from '../../../../store/user-id/selectors';
import { useMakeMapState } from '../../../../store/use-store';
import { useUserId } from '../../utils';
import { removeRole } from '../../../../store/users/actions';

interface OwnProps {
  role: keyof typeof roles,
  removeable?: boolean,
  children: ReactNode,
}

const styles = {
  container: {
    height: 20,
    padding: '0 6px',
    borderRadius: 3,
    backgroundColor: colors.N40,
    margin: 4,
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    color: (props: OwnProps) => roles[props.role].color,
    fontSize: 14,
  },

  removeIcon: {
    cursor: 'pointer',
    marginLeft: 4,
    height: 16,
  },
};

const makeMapState = () => {
  const getUserById = makeGetUserById();

  return (state: State, userId: string | null) => {
    return {
      canRemove: hasPermission(
        'user.change-role',
        getCurrentUser(state),
        getUserById(state, userId),
      ),
    };
  };
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

function Role(props: Props) {
  const userId = useUserId();
  const { canRemove } = useMakeMapState(makeMapState, userId);

  const handleRemoveClick = useCallback(() => {
    if (userId !== null) {
      removeRole(userId, props.role);
    }
  }, [props.role]);

  return (
    <span className={props.classes.container}>
      <span className={props.classes.text}>
        {roles[props.role].display}
      </span>

      {canRemove && props.role !== 'user' && (
        <span className={props.classes.removeIcon}>
          <CrossIcon
            label="Remove"
            size="small"
            onClick={handleRemoveClick}
          />
        </span>
      )}
    </span>
  );
}

export default withStyles(styles)(Role);
