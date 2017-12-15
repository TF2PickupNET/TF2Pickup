import React from 'react';
import Helmet from 'react-helmet';

import MarkdownView from '../../components/markdown-view';

const HELP_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/HELP.md';

/**
 * The view for the rules page.
 *
 * @returns {JSX} - Returns the view.
 */
export default function View() {
  return (
    <div>
      <Helmet>
        <title>
          Help
        </title>
      </Helmet>

      <MarkdownView url={HELP_URL} />
    </div>
  );
}
