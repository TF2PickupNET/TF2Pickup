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
      maxWidth: 1000,
    },
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <Card className={this.props.classes.content}>
          <RemoteMarkdown url={this.props.url} />
        </Card>
      </div>
    );
  }
}

export default injectSheet(MarkdownView.styles)(MarkdownView);
