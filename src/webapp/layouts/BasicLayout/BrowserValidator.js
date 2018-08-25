// @flow

import React, { type Node } from 'react';
import is from 'is_js';
import {
  Card,
  Col,
  Row,
  Button,
} from 'antd';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

type Props = {
  children: Node,
  classes: {
    card: string,
    container: string,
  },
};
type State = { ignoreWarning: boolean };

const styles = {
  container: { minHeight: '100vh' },

  card: { margin: 20 },
};

class BrowserValidator extends React.PureComponent<Props, State> {
  static STORAGE_KEY = 'IGNORE_UNSUPPORTED_BROWSER_WARNING';

  isDesktop = is.desktop();

  isValidBrowser = is.chrome(65) || is.firefox(59);

  state = { ignoreWarning: localStorage.getItem(BrowserValidator.STORAGE_KEY) === 'true' };

  getCardContent() {
    if (!this.isDesktop) {
      return {
        title: 'It appears you are not on a desktop browser',
        content: (
          <React.Fragment>
            We currently support only desktop browsers.
          </React.Fragment>
        ),
      };
    }

    return {
      title: 'It appears you are using an unsupported browser',
      content: (
        <React.Fragment>
          You are apparently using an unsupported browsers.<br />

          We currently only support:
          <ul>
            <li>Chrome 65 or higher</li>
            <li>Chrome 59 or higher</li>
          </ul>
        </React.Fragment>
      ),
    };
  }

  handleClick = () => {
    localStorage.setItem(BrowserValidator.STORAGE_KEY, 'true');

    this.setState({ ignoreWarning: true });
  };

  renderCard() {
    const card = this.getCardContent();

    return (
      <Card
        title={card.title}
        className={this.props.classes.card}
      >
        {card.content}

        <br />
        <br />

        Please note that when you report any bug or something is broken
        and you aren&amp;t using a desktop and supported browser,
        we will not fix your bug.

        <br />

        <Button onClick={this.handleClick}>
          Ignore warning and continue
        </Button>
      </Card>
    );
  }

  render() {
    if ((this.isDesktop && this.isValidBrowser) || this.state.ignoreWarning) {
      return this.props.children;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Helmet>
          <title>Wrong browser</title>
        </Helmet>

        <Col>
          {this.renderCard()}
        </Col>
      </Row>
    );
  }
}

export default injectSheet(styles)(BrowserValidator);
