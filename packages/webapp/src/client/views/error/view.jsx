import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import randomItem from 'random-item';
import sixes from '@tf2-pickup/assets/images/background/6v6.jpg';
import hl from '@tf2-pickup/assets/images/background/9v9.jpg';
import bball from '@tf2-pickup/assets/images/background/bball.jpg';
import ultiduo from '@tf2-pickup/assets/images/background/ultiduo.jpg';

import ErrorCard from './error-card';

const bgImage = randomItem([sixes, hl, bball, ultiduo]);

/**
 * The view for the error page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function View(props) {
  return (
    <div className={props.classes.container}>
      <Helmet>
        <title>Error</title>
      </Helmet>

      <ErrorCard />
    </div>
  );
}

View.propTypes = { classes: PropTypes.shape({ container: PropTypes.string }).isRequired };

View.styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};

export default injectSheet(View.styles)(View);
