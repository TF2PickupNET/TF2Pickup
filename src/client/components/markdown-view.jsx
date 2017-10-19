import React, { PureComponent } from 'react';
import { Card, Spinner } from 'materialize-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import RemoteMarkdown from './remote-markdown';

/**
 * A component that renders a remote markdown document
 * on a card.
 *
 * @class
 */
class MarkdownView extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    content: {
      width: '100%',
      maxWidth: 960,
    },
  };

  render() {
    const markdownHandler = {
      waiting: <Spinner active />,
      ready: component => (
        <Card className={this.props.classes.content}>
          <Card.Content>
            {component}
          </Card.Content>
        </Card>
      ),
    };

    return (
      <div className={this.props.classes.container}>
        <RemoteMarkdown url={this.props.url}>
          {markdownHandler}
        </RemoteMarkdown>
      </div>
    );
  }
}

export default injectSheet(MarkdownView.styles)(MarkdownView);
