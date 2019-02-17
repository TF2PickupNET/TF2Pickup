import React, { FunctionComponent } from 'react';
import { Redirect } from '@reach/router';
import { State, useMapState } from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import RequireLogin from '@webapp/components/RequireLogin';


const mapState = (state: State) => {
  return { currentUserId: getCurrentUserId(state) };
};

interface Props {
  path: string,
}

const ProfileRedirect: FunctionComponent<Props> = () => {
  const { currentUserId } = useMapState(mapState);

  return (
    <RequireLogin>
      {currentUserId !== null && (
        <Redirect noThrow to={`/profile/${currentUserId}`} />
      )}
    </RequireLogin>
  );
};

export default ProfileRedirect;
