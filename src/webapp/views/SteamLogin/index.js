// @flow

import React from 'react';
import queryString from 'query-string';
import {
  type ContextRouter,
  Redirect,
} from 'react-router-dom';

export default class SteamLogin extends React.PureComponent<ContextRouter> {
  constructor(props: ContextRouter) {
    super(props);

    const query = queryString.parse(props.location.search);

    if (query.token) {
      window.localStorage.setItem('feathers-jwt', query.token);
    }
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}
