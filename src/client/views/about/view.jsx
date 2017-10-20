import React from 'react';
import Helmet from 'react-helmet';

import MarkdownView from '../../components/markdown-view';

const ABOUT_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/ABOUT.md';

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

      <MarkdownView url={ABOUT_URL} />
    </div>
  );
}
