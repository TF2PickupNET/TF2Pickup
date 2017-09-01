import React from 'react';
import { Card } from 'materialize-react';
import queryString from 'query-string';

export default function Error({ location }) {
  const query = queryString.parse(location.search);

  console.log(query);

  return (
    <Card>
      <Card.Header>An error occured</Card.Header>
      <Card.Content>{query.message}</Card.Content>
    </Card>
  );
}
