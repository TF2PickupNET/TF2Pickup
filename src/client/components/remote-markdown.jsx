import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

/**
 * A component that renders a markdown document. The document
 * itself is fetch from the given url.
 *
 * @class
 */
export default class RemoteMarkdown extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.shape({
      waiting: PropTypes.node.isRequired,
      ready: PropTypes.func.isRequired,
    }).isRequired,
  };

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

    const waiting = this.props.children.waiting;
    const ready = this.props.children.ready;

    if (markdown) {
      return ready(<ReactMarkdown source={markdown} />);
    }

    return waiting;
  }
}
