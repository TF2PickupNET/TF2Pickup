import React from 'react';

import MainLayout from './main-layout';

/**
 * Compose a component with the MainLayout. This is used for react router.
 *
 * @param {Function} Component - The component to render as the content inside the layout.
 * @param {Object} props - Additional static props for the component.
 * @returns {Function} - Returns a function which will render the view.
 */
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
