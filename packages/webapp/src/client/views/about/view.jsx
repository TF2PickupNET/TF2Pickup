import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Aux from 'react-aux';
import {
  Card,
  Typography,
} from 'materialize-react';

import RemoteMarkdown from '../../components/remote-markdown';

import Partners from './partners';
import SocialMedia from './social-media';

const README_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/README.md';

/**
 * The view for the about page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the view.
 */
function View(props) {
  return (
    <Aux>
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
    </Aux>
  );
}

View.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
  }).isRequired,
};

View.styles = {
  card: {
    maxWidth: 1024,
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
  },

  headline: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    display: 'block',
  },
};

export default injectSheet(View.styles)(View);
