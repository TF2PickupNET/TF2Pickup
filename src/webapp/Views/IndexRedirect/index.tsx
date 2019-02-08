import React from 'react';
import { Redirect } from 'react-router-dom';
import { isString } from '@utils/string';

export default function IndexRedirect() {
  const lastGamemode = localStorage.getItem('last-gamemode');

  return (
    <Redirect to={`/${isString(lastGamemode) ? lastGamemode : '6v6'}`} />
  );
}
