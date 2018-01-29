import React from 'react';
import Helmet from 'react-helmet';
import Aux from 'react-aux';

import MarkdownView from '../../components/markdown-view';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

/**
 * The view for the rules page.
 *
 * @returns {JSX} - Returns the view.
 */
export default function View() {
  return (
    <Aux>
      <Helmet>
        <title>
          Rules
        </title>
      </Helmet>

      <MarkdownView url={RULES_URL} />
    </Aux>
  );
}
