// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getCurrentUserId } from '../../store/user-id/selectors';
import { type State } from '../../store';

type Props = { userId: string | null };

function ProfileRedirect(props: Props) {
  return (
    <Redirect to={props.userId === null ? '/' : `/profile/${props.userId}`} />
  );
}

const mapStateToProps = (state: State): $Shape<Props> => {
  return { userId: getCurrentUserId(state) };
};

export default connect(mapStateToProps)(ProfileRedirect);
