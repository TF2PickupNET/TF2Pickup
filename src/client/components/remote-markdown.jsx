import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Spinner } from 'materialize-react';
import ReactMarkdown from 'react-markdown';

/**
 * A component that renders a markdown document. The document
 * itself is fetch from the given url.
 *
 * @class
 */
export default class RemoteMarkdown extends PureComponent {
  static propTypes = { url: PropTypes.string.isRequired };

  state = { markdown: null };

  /**
   * Fetch rules from the specified url.
   */
  async componentWillMount() {
    const response = await axios.get(this.props.url);

    this.setState({ markdown: response.data });
  }

  render() {
    const { markdown } = this.state;

    if (!markdown) {
      return <Spinner active />;
    }

    return <ReactMarkdown source={markdown} />;
  }
}
