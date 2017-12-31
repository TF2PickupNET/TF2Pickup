import React, { PureComponent } from 'react';
import {
  Card,
  Tab,
  Tabs,
} from 'materialize-react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import regions from '@tf2-pickup/configs/regions';

import {
  pipe,
  pluck,
} from '../../../../utils/functions';

class Chat extends PureComponent {
  static styles = {
    card: {
      marginLeft: 0,
      marginRight: 0,
      display: 'grid',
      padding: 8,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
    },
  };

  state = { selectedChat: this.props.region };

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

  handleTabChange = (tab) => {
    this.setState({ selectedChat: tab });
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <Tabs
          tab={this.state.selectedChat}
          onChange={this.handleTabChange}
        >
          <Tab name="global">
            Global
          </Tab>

          <Tab name={this.props.region}>
            {regions[this.props.region].fullName}
          </Tab>
        </Tabs>
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
