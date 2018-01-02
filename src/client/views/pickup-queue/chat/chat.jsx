import React, { PureComponent } from 'react';
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

import Input from './input';
import MessagesContainer from './messages-container';

/**
 * The chat component.
 *
 * @class
 */
class Chat extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      tabs: PropTypes.string.isRequired,
    }).isRequired,
    region: PropTypes.string.isRequired,
  };

  static styles = {
    card: {
      marginLeft: 0,
      marginRight: 0,
      display: 'grid',
      padding: '8px 8px 0 8px',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
    },

    tabs: { marginBottom: 8 },
  };

  state = { selectedChat: this.props.region };

  /**
   * Change the region when the user changes his region.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.region !== this.props.region) {
      this.setState((state) => {
        if (state.selectedChat === this.props.region) {
          return { selectedChat: nextProps.region };
        }

        return null;
      });
    }
  }

  /**
   * Change the selected chat when the tab changes.
   */
  handleTabChange = (tab) => {
    this.setState({ selectedChat: tab });
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <Tabs
          tab={this.state.selectedChat}
          className={this.props.classes.tabs}
          onChange={this.handleTabChange}
        >
          <Tab name="global">
            Global
          </Tab>

          <Tab name={this.props.region}>
            {regions[this.props.region].fullName}
          </Tab>
        </Tabs>

        <MessagesContainer chat={this.state.selectedChat} />

        <Input chat={this.state.selectedChat} />
      </Card>
    );
  }
}

export default pipe(
  connect((state) => {
    return { region: pluck('settings.region', 'eu')(state.user) };
  }),
  injectSheet(Chat.styles),
)(Chat);
