import { Redirect, Location } from '@reach/router';
import React, { ReactNode } from 'react';
import { isString } from '@utils/string';

interface Props {
  children: ReactNode,
}

function SteamLoginToken(props: Props) {
  return (
    <Location>
      {({ location }) => {
        const url = new URL(location.href);
        const query = new URLSearchParams(url.search);
        const token = query.get('token');

        if (isString(token)) {
          window.localStorage.setItem('feathers-jwt', token);
          query.delete('token');

          url.search = query.toString();

          return (
            <Redirect to={url.toString()} />
          );
        }

        return (
          <React.Fragment>
            {props.children}
          </React.Fragment>
        );

      }}
    </Location>
  );
}

export default SteamLoginToken;
