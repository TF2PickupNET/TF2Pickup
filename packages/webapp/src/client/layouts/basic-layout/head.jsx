import React from 'react';
import Helmet from 'react-helmet';
import favicon from '@tf2-pickup/assets/images/favicon.ico';

/**
 * Global head elements.
 *
 * @returns {JSX} - Returns the JSX.
 */
export default function Head() {
  return (
    <Helmet titleTemplate="%s | TF2Pickup.net">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700"
      />
      <link
        rel="preload"
        as="font"
        href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic"
      />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta
        name="twitter:card"
        content="summary"
      />
      <meta
        name="twitter:site"
        content="@TF2Pickup"
      />
      <meta
        name="twitter:title"
        content="TF2Pickup.net | Web-based Pickup system"
      />
      <meta
        name="twitter:description"
        content={[
          'A web-based pickup system, where players can easily play',
          'competitive Team Fortress 2 in a variety of formats',
        ].join(' ')}
      />
      <meta
        name="twitter:image"
        content="/assets/images/icons/logo.png"
      />

      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={favicon}
      />
    </Helmet>
  );
}
