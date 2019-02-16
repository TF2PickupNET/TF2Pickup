import React from 'react';
import { isString } from '@utils/string';
import { Redirect } from '@reach/router';

export default function IndexRedirect() {
  const lastGamemode = localStorage.getItem('last-gamemode');

  return (
    <Redirect to={`/${isString(lastGamemode) ? lastGamemode : '6v6'}`} />
  );
}
