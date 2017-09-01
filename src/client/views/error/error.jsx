import React from 'react';
import { Card } from 'materialize-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

/**
 * The error page when an error occurs on the server.
 * The server will redirect the user to this page then.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.location - The current location including the search string.
 * Passed by React Router.
 * @returns {JSX} - Returns the jsx.
 */
export default function Error({ location }) {
  const query = queryString.parse(location.search);

  return (
    <Card>
      <Card.Header>An error occured</Card.Header>
      <Card.Content>{query.message}</Card.Content>
    </Card>
  );
}

Error.propTypes = { location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired };
