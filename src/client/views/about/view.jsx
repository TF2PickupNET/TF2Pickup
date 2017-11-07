import React from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import {
  Card,
  Layout,
} from 'materialize-react';

import RemoteMarkdown from '../../components/remote-markdown';

import Partners from './partners';

const ABOUT_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/ABOUT.md';

/**
 * The view for the about page.
 *
 * @returns {JSX} - Returns the view.
 */
function View(props) {
  return (
    <Layout mainAlign="center">
      <Helmet>
        <title>About</title>
      </Helmet>

      <Card className={props.classes.card}>
        <Card.Content>
          <RemoteMarkdown url={ABOUT_URL} />

          <Partners />
        </Card.Content>
      </Card>
    </Layout>
  );
}

View.styles = {
  card: {
    maxWidth: 1024,
    width: '100%',
  },
};

export default injectSheet(View.styles)(View);
