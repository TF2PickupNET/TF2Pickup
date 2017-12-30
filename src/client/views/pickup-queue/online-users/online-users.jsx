import React from 'react';
import { Card } from 'materialize-react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { computeLevel } from '../../../../utils/has-permission';

import OnlineUserItem from './online-user-item';

/**
 * Render the online users for the users region.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
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

OnlineUsers.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
  }).isRequired,
  onlineUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

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
    return {
      onlineUsers: Object
        .values(state.onlineUsers)
        .sort((userA, userB) => computeLevel(userB) - computeLevel(userA))
        .map(user => user.id),
    };
  },
)(injectSheet(OnlineUsers.styles)(OnlineUsers));
