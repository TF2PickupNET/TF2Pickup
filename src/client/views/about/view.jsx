import React from 'react';
import Helmet from 'react-helmet';

/**
 * The view for the about page.
 *
 * @returns {JSX} - Returns the view.
 */
export default function View() {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
    </div>
  );
}
