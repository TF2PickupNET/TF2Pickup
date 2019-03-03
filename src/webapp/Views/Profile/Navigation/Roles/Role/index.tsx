import React, { useCallback, useContext } from 'react';
import roles from '@config/roles';
import withStyles, { WithStyles } from 'react-jss';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { useActions } from '@webapp/store';
import { removeRole } from '@webapp/store/users/actions';
import { UserIdContext } from '@webapp/Views/Profile';

const styles = {
  role: {
    height: 16,
    padding: [4, 8],
    margin: [4, 8],
    lineHeight: '16px',
    borderRadius: 2,
    backgroundColor: (props: Props) => roles[props.role].color || '#EBECF0',
  },

  removeIcon: {
    marginLeft: 6,
    cursor: 'pointer',
  },
};

interface Props extends WithStyles<typeof styles> {
  role: keyof typeof roles,
  isRemovable: boolean,
}

function Role(props: Props) {
  const userId = useContext(UserIdContext);
  const { canRemoveRole = true } = {};
  const actions = useActions({ removeRole });
  const handleRemove = useCallback(() => {
    actions.removeRole(userId, props.role);
  }, []);

  return (
    <span className={props.classes.role}>
      {roles[props.role].display}

      {canRemoveRole && props.isRemovable && (
        <span
          className={props.classes.removeIcon}
          onClick={handleRemove}
        >
          <CrossIcon
            label="Remove role"
            size="small"
          />
        </span>
      )}
    </span>
  );
}

export default withStyles(styles)(Role);
