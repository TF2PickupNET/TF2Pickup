import React from 'react';
import { Redirect } from 'react-router-dom';

export default function IndexRedirect() {
  const lastGamemode = localStorage.getItem('last-gamemode') || '6v6';

  return (
    <Redirect to={`/${lastGamemode}`} />
  );
}
