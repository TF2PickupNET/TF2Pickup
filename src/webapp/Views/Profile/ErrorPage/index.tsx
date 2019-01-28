import React, { ReactNode } from 'react';

import { useUserId } from '../utils';
import {
  State,
  useMakeMapState,
} from '../../../store';
import { makeGetUserErrorById } from '../../../store/users/selectors';
import { makeGetProfileErrorById } from '../../../store/user-profiles/selectors';

interface Props {
  children: ReactNode,
}

const makeMapState = () => {
  const getUserErrorById = makeGetUserErrorById();
  const getProfileErrorById = makeGetProfileErrorById();

  return (state: State, userId: string | null) => {
    return {
      userError: getUserErrorById(state, userId),
      profileError: getProfileErrorById(state, userId),
    };
  };
};


function ErrorPage(props: Props) {
  const userId = useUserId();
  const {
    userError,
    profileError
  } = useMakeMapState(makeMapState, userId);
  const error = userError || profileError;

  if (error !== null) {
    return (
      <React.Fragment>
        <h4>{error.message}</h4>

        <p>
          Couldn't load user
        </p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default ErrorPage;
