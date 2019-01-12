import React from 'react';
import { Redirect as RouterRedirect } from 'react-router-dom';

import { getCurrentUserId } from '../../../store/user-id/selectors';
import { useMapState } from '../../../store/use-store';
import { State } from '../../../store';

const mapState = (state: State) => {
  return { userId: getCurrentUserId(state) };
};

export default function Redirect() {
  const { userId } = useMapState(mapState);

  if (userId !== null) {
    return (
      <RouterRedirect to={`/profile/${userId}`} />
    );
  }

  return (
    <div>
      Hello
    </div>
  );
}
