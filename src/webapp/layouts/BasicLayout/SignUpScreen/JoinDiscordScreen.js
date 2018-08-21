// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  Row,
  Button,
} from 'antd';

import { socialMedias } from '../../../../config';

type State = { isProcessing: boolean };
type Props = {
  nextStep: () => void,
  classes: { button: string },
};

const styles = { button: { margin: '0 8px' } };

class JoinDiscordScreen extends React.PureComponent<Props, State> {
  handleJoinClick = () => {
    this.props.nextStep();

    window.open(socialMedias.discord.urls.invite);
  };

  handleSkipClick = () => {
    this.props.nextStep();
  };

  renderButtons() {
    return (
      <Row
        type="flex"
        justify="center"
      >
        <Button
          className={this.props.classes.button}
          onClick={this.handleSkipClick}
        >
          Skip
        </Button>

        <Button
          className={this.props.classes.button}
          onClick={this.handleJoinClick}
        >
          Join Discord
        </Button>
      </Row>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          Join our Discord for a better TF2Pickup experience.
          <br />
          You will receive important notifications about:
          <ul>
            <li>Server Maintenance</li>
            <li>Special Events</li>
            <li>Sub Reports</li>
            <li>Important Announcements</li>
          </ul>
        </div>

        {this.renderButtons()}
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(JoinDiscordScreen);
