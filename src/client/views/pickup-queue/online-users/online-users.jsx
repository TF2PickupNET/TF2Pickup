import React from 'react';
import { Card } from 'materialize-react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import OnlineUserItem from './online-user-item';

function OnlineUsers(props) {
  return (
    <Card className={props.classes.card}>
      <Card.Header>
        Online Users
      </Card.Header>

      <div className={props.classes.list}>
        {props.onlineUsers.map(id => (
          <OnlineUserItem
            key={id}
            id={id}
          />
        ))}
      </div>
    </Card>
  );
}

OnlineUsers.styles = {
  card: {
    marginLeft: 0,
    marginRight: 0,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
  },

  list: { paddingBottom: 8 },
};

export default connect(
  (state) => {
    return { onlineUsers: Object.keys(state.onlineUsers) };
  },
)(injectSheet(OnlineUsers.styles)(OnlineUsers));
