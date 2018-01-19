import React from 'react';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import { Typography } from 'materialize-react';
import { connect } from 'react-redux';

import UserItem from '../../../components/user-item';
import { pipe } from '../../../../utils/functions';

function UserInfo(props) {
  return (
    <Aux>
      {props.name && (
        <Typography typography="title">
          <UserItem
            user={{
              name: props.name,
              roles: props.roles,
              id: props.userId,
            }}
          />
        </Typography>
      )}

      <img
        className={props.classes.avatar}
        alt="avatar"
        src={props.avatar}
      />
    </Aux>
  );
}

UserInfo.styles = {
  avatar: {
    height: 48,
    width: 48,
    borderRadius: '50%',
    marginLeft: 16,
  },
};

export default pipe(
  connect((state) => {
    return {
      name: state.user.name,
      roles: state.user.roles,
      userId: state.user.id,
      avatar: state.user.services.steam.avatar.large,
    };
  }),
  injectSheet(UserInfo.styles),
)(UserInfo);
