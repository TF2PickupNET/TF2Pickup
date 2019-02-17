import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  path: string,
}

const RouteContainer = (props: Props) => {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};

export default RouteContainer;
