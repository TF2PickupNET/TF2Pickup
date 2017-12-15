import React from 'react';
import Helmet from 'react-helmet';

/**
 * The view for the recent pickups page.
 *
 * @returns {JSX} - Returns the view.
 */
export default function View() {
  return (
    <div>
      <Helmet>
        <title>
          Recent Pickups
        </title>
      </Helmet>
    </div>
  );
}
