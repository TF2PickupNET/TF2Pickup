import React, { ReactNode, useContext } from 'react';
import {
  State,
  useMakeMapState,
} from '@webapp/store';
import { makeGetUserErrorById } from '@webapp/store/users/selectors';
import { makeGetProfileErrorById } from '@webapp/store/user-profiles/selectors';
import { UserIdContext } from '@webapp/Views/Profile';

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
  const userId = useContext(UserIdContext);
  const {
    userError,
    profileError,
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
