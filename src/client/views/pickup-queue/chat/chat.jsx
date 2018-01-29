import React from 'react';
import {
  Card,
  Tab,
  Tabs,
} from 'materialize-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import regions from '@tf2-pickup/configs/regions';

import {
  pipe,
  pluck,
} from '../../../../utils/functions';
import ChatComponent from '../../../components/chat';

/**
 * Renders the actual chat card.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Chat(props) {
  return (
    <Card className={props.classes.card}>
      <Tabs
        tab={props.chat}
        onChange={props.onChatChange}
      >
        <Tab name="global">
          Global
        </Tab>

        <Tab name={props.region}>
          {regions[props.region].fullName}
        </Tab>
      </Tabs>

      <ChatComponent
        messages={props.messages}
        onSubmit={props.onSubmit}
      />
    </Card>
  );
}

Chat.propTypes = {
  classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  region: PropTypes.string.isRequired,
  chat: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChatChange: PropTypes.func.isRequired,
};

Chat.styles = {
  card: {
    marginLeft: 0,
    marginRight: 0,
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridGap: '8px',
    padding: '8px 8px 0 8px',
  },
};

export default pipe(
  connect((state, props) => {
    return { messages: pluck(props.chat, [])(state.chat) };
  }),
  injectSheet(Chat.styles),
)(Chat);
