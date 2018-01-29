import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Theme,
  Background,
  Card,
  Layout,
  Divider,
  Button,
} from 'materialize-react';
import PropTypes from 'prop-types';
import { socialMedia } from '@tf2-pickup/config';

import openWindowInNewTab from '../../utils/open-window-in-new-tab';
import app from '../../app';

/**
 * An error boundary which catches errors in the react vdom tree.
 *
 * @class
 */
class ErrorBoundary extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
    children: PropTypes.node.isRequired,
    isTopLevel: PropTypes.bool,
  };

  static defaultProps = { isTopLevel: false };

  static styles = {
    card: {
      marginTop: 100,
      maxWidth: 400,
    },
  };

  state = { hasError: false };

  error = null;

  /**
   * When the component catches an error, set the hasError state to true.
   *
   * @param {Object} error - The error object.
   * @param {Object} info - The info for the error.
   */
  componentDidCatch(error, info) {
    this.error = error;
    this.info = info;

    this.setState({ hasError: true });

    app.service('errors').create({
      message: error,
      info,
    });
  }

  /**
   * Open a new tab with the dircord help channel url.
   */
  handleButtonPress = () => {
    openWindowInNewTab(socialMedia.discord.urls.help);
  };

  /**
   * Render the error content.
   *
   * @returns {JSX} - Returns the jsx.
   */
  renderErrorContent() {
    return (
      <Card className={this.props.classes.card}>
        <Card.Header>
          An error happened
        </Card.Header>

        <Card.Content>
          Error message: {this.error.message}.
          <br />
          <br />
          If you want to help to fix this error,
          go to our discord server and private message kampfkeks.
        </Card.Content>

        <Divider />

        <Card.Actions>
          <Button onPress={this.handleButtonPress}>
            Go to discord
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return this.props.isTopLevel ? (
      <Theme>
        <Background style={{ height: '100%' }}>
          <Layout
            mainAlign="center"
            crossAlign="center"
          >
            {this.renderErrorContent()}
          </Layout>
        </Background>
      </Theme>
    ) : this.renderErrorContent();
  }
}

export default injectSheet(ErrorBoundary.styles)(ErrorBoundary);
