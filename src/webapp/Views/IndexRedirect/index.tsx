import React, { FunctionComponent } from 'react';
import { isString } from '@utils/string';
import { Redirect } from '@reach/router';

interface Props {
  path: string,
}

const IndexRedirect: FunctionComponent<Props> = () => {
  const lastGamemode = localStorage.getItem('last-gamemode');

  return (
    <Redirect to={`/${isString(lastGamemode) ? lastGamemode : '6v6'}`} noThrow />
  );
};

export default IndexRedirect;
