import React, { PureComponent } from 'react';
import { Card } from 'materialize-react';
import injectSheet from 'react-jss';

class ChatContainer extends PureComponent {
  static styles = {
    card: {
      marginLeft: 0,
      marginRight: 0,
      padding: 8,
    },
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        Chat
      </Card>
    );
  }
}

export default injectSheet(ChatContainer.styles)(ChatContainer);
