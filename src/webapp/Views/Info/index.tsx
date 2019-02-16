import React, { ReactNode } from 'react';
import Navigation from './Navigation';

interface Props {
  children: ReactNode,
  path: string,
}

function Info(props: Props) {
  return (
    <React.Fragment>
      <Navigation />

      {props.children}
    </React.Fragment>
  );
}

export default Info;
