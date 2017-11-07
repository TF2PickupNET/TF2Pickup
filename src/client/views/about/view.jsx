import React from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import {
  Card,
  Layout,
  Typography,
} from 'materialize-react';

import RemoteMarkdown from '../../components/remote-markdown';

import Partners from './partners';
import SocialMedia from './social-media';

const README_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/README.md';

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
          <RemoteMarkdown url={README_URL} />

          <Typography
            typography="display1"
            className={props.classes.headline}
          >
            Social Media
          </Typography>

          <SocialMedia />

          <Typography
            typography="display1"
            className={props.classes.headline}
          >
            Partners
          </Typography>

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

  headline: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    display: 'block',
  },
};

export default injectSheet(View.styles)(View);
