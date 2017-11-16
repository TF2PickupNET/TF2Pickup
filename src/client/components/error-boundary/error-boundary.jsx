import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Theme,
  Background,
  Card,
  Layout,
  Divider,
  Button,
  IconButton,
} from 'materialize-react';
import PropTypes from 'prop-types';

class ErrorBoundary extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      stackTraceContainer: PropTypes.string.isRequired,
      cardActions: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    isTopLevel: PropTypes.bool,
  };

  static defaultProps = { isTopLevel: false };

  static styles = {
    card: { marginTop: 100 },

    stackTraceContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      padding: '16px 24px',
    },

    cardActions: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
    },
  };

  state = {
    hasError: false,
    showStackTrace: false,
  };

  error = null;

  componentDidCatch(error, info) {
    this.error = error;
    this.info = info;

    this.setState({ hasError: true });
  }

  handleIconButtonPress = () => {
    this.setState((state) => {
      return { showStackTrace: !state.showStackTrace };
    });
  };

  renderComponentStack() {
    return this.info.componentStack
      .split('\n')
      .map((trace, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index}>
          {trace}
        </span>
      ));
  }

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
          <Button>
            Go to discord
          </Button>
        </Card.Actions>

        <Divider />

        <Card.Actions className={this.props.classes.cardActions}>
          <span>Error Trace</span>

          <IconButton
            icon="chevron-down"
            className={this.props.classes}
            onPress={this.handleIconButtonPress}
          />
        </Card.Actions>

        {this.state.showStackTrace ? (
          <span className={this.props.classes.stackTraceContainer}>
            {this.renderComponentStack()}
          </span>
        ) : null}
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
