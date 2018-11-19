// @flow

import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import React from 'react';

import { useLocation } from '../../utils/use-router';

function SteamLoginToken() {
  const location = useLocation();
  const {
    token,
    ...query
  } = queryString.parse(location.search);

  if (token) {
    window.localStorage.setItem('feathers-jwt', token);

    console.log(token);

    return (
      <Redirect
        to={{
          ...location,
          search: queryString.stringify(query),
        }}
      />
    );
  }

  return null;
}

export default SteamLoginToken;