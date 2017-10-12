import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Spinner } from 'materialize-react';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

/**
 * The view for the rules page.
 *
 * @returns {JSX} - Returns the view.
 */
export default class View extends PureComponent  {

  state = {
    rules: null,
  };

  componentDidMount() {
    axios.get(RULES_URL)
      .then((response) => {
        this.setState({ rules: response.data });
      });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Rules</title>
        </Helmet>

        {this.state.rules == null ? (
          <Spinner active />
        ) : (
          <ReactMarkdown source={this.state.rules} />
        )}
      </div>
    );
  }
}
