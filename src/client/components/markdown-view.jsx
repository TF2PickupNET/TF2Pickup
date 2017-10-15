import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from 'materialize-react';
import ReactMarkdown from 'react-markdown';
import Aux from 'react-aux';

/**
 * A component that renders a markdown document.
 * 
 * @class
 */
export default class MarkdownView extends PureComponent {
  static propTypes = { url: PropTypes.string.isRequired };

  state = { rules: null };

  /**
   * Fetch rules from the specified url.
   */
  async componentWillMount() {
    const response = await axios.get(this.props.url);

    this.setState({ rules: response.data });
  }

  render() {
    const rules = this.state.rules;

    return (
      <Aux>
        {typeof rules === 'undefined' ? (
          <Spinner active />
        ) : (
          <ReactMarkdown source={rules} />
        )}
      </Aux>
    );
  }
}
