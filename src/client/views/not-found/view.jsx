import React, { PureComponent } from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

class View extends PureComponent {
  handleGoBackPress = () => {
    this.props.goBack();
  };

  render() {
    return (
      <Card>
        <Helmet>
          <title>Not Found</title>
        </Helmet>

        <Card.Header>
          Not Found
        </Card.Header>

        <Card.Content>
          This is propably not what you are looking for
        </Card.Content>

        <Card.Actions>
          <Button onPress={this.handleGoBackPress}>
            Go back
          </Button>
        </Card.Actions>
      </Card>
    );
  }
}

export default connect(
  null,
  (dispatch) => {
    return { goBack: () => dispatch(goBack()) };
  },
)(View);
