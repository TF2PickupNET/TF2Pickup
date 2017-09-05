import React from 'react';

import MainLayout from './main-layout';

export default function composeWithMainLayout(Component, props) {
  return routeProps => (
    <MainLayout>
      <Component
        {...props}
        {...routeProps}
      />
    </MainLayout>
  );
}
