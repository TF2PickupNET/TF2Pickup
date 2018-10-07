// @flow

import React from 'react';
import queryString from 'query-string';
import {
  type ContextRouter,
  Redirect,
} from 'react-router-dom';

type Props = ContextRouter;

export default class SteamLogin extends React.PureComponent<Props> {
  constructor(props: Props) {
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
