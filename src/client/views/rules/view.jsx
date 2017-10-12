import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

// TODO Read content from a file
var content = `
## TF2Pickup very important rules
1. First rule
2. Second

   Properly indented paragraph

   [ETF2L](http://etf2l.org/) account is rqeuired (testing links);

3. Third
  * Whatever
  * whatever
`;

/**
 * The view for the rules page.
 *
 * @returns {JSX} - Returns the view.
 */
export default class View extends PureComponent  {

  render() {
    return (
      <div>
        <Helmet>
          <title>Rules</title>
        </Helmet>

        <ReactMarkdown source={content} />
      </div>
    );
  }
}
