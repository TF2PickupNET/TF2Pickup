import React from 'react';
import {
  Card,
  Button,
} from 'materialize-react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';

/**
 * The view for the Not Found page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function View(props) {
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
        <Button onPress={props.handleGoBack}>
          Go back
        </Button>
      </Card.Actions>
    </Card>
  );
}

View.propTypes = { handleGoBack: PropTypes.func.isRequired };

export default connect(
  null,
  (dispatch) => {
    return { handleGoBack: () => dispatch(goBack()) };
  },
)(View);
