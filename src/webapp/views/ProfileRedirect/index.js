// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

type Props = { userId: string };

function ProfileRedirect(props: Props) {
  return (
    <Redirect to={`/profile/${props.userId}`} />
  );
}

export default connect((state) => {
  return { userId: state.user.id };
})(ProfileRedirect);
