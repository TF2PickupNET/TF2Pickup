import React, { PureComponent } from 'react';
import { Card } from 'materialize-react';
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
    classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
  };

  static styles = {
    content: {
      width: '100%',
      maxWidth: 960,
      marginTop: 0,
      marginBottom: 0,
    },
  };

  render() {
    return (
      <RemoteMarkdown url={this.props.url}>
        {component => (
          <Card className={this.props.classes.content}>
            <Card.Content>
              {component}
            </Card.Content>
          </Card>
        )}
      </RemoteMarkdown>
    );
  }
}

export default injectSheet(MarkdownView.styles)(MarkdownView);
