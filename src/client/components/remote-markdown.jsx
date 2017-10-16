import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from 'materialize-react';
import ReactMarkdown from 'react-markdown';

/**
 * A component that renders a markdown document. The document
 * itself is fetch from the given url.
 * 
 * @class
 */
export default class RemoteMarkdown extends PureComponent {
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
    const { rules } = this.state;

    if (typeof rules === 'undefined') {
      return <Spinner active />;
    }

    return <ReactMarkdown source={rules} />;
  }
}
