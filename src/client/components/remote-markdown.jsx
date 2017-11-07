import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import injectSheet from 'react-jss';
import {
  Spinner,
  Typography,
  typography,
} from 'materialize-react';

/**
 * A component that renders a markdown document. The document
 * itself is fetch from the given url.
 *
 * @class
 */
class RemoteMarkdown extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func,
  };

  static defaultProps = { children: component => component };

  static renderers = {
    Heading(level, children) {
      const typos = {
        1: 'display3',
        2: 'display2',
        3: 'display1',
        4: 'headline',
        5: 'title',
        6: 'body1',
      };

      return (
        <Typography typography={typos[level]}>
          {children}
        </Typography>
      );
    },
  };

  static styles = {
    container: {
      fontSize: 16,
      lineHeight: 1.25,

      '& ol, ul': {
        margin: 0,
        paddingLeft: 30,

        '& li': { padding: '2px 0' },

        '& ol, ul': { paddingLeft: 20 },
      },

      '& ul': { listStyleType: 'disc' },
    },
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

    if (markdown) {
      return this.props.children(
        <ReactMarkdown
          renderers={RemoteMarkdown.renderers}
          source={markdown}
          className={this.props.classes.container}
        />,
      );
    }

    return <Spinner active />;
  }
}

export default injectSheet(RemoteMarkdown.styles)(RemoteMarkdown);
