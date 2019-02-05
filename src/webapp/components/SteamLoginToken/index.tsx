import { Redirect } from 'react-router-dom';
import React, { ReactNode } from 'react';

import { useLocation } from '@webapp/utils/use-router';
import { isString } from '@utils/string';

interface Props {
  children: ReactNode,
}

function SteamLoginToken(props: Props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  if (isString(token)) {
    window.localStorage.setItem('feathers-jwt', token);
    query.delete('token');

    return (
      <Redirect
        to={{
          ...location,
          search: query.toString(),
        }}
      />
    );
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default SteamLoginToken;
