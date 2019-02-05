import React, { ReactNode } from 'react';

import { Row } from '@webapp/components/Grid';

import GlobalNavigation from './GlobalNavigation';

interface Props {
  children: ReactNode,
}

function MainLayout(props: Props) {
  return (
    <Row>
      <GlobalNavigation />

      {props.children}
    </Row>
  );
}

export default MainLayout;
