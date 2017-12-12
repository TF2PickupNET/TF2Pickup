import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout } from 'materialize-react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import RegionSetting from './region-setting';
import ThemeSetting from './theme-setting';
import VolumeSetting from './volume-setting';

/**
 * The view for the settings page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the view.
 */
function View(props) {
  if (!props.userId) {
    return null;
  }

  return (
    <Layout
      direction="column"
      className={props.classes.container}
    >
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <RegionSetting />
      <ThemeSetting />
      <VolumeSetting />
    </Layout>
  );
}

View.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
  userId: PropTypes.string,
};

View.defaultProps = { userId: null };

View.styles = {
  container: {
    maxWidth: 680,
    width: '100%',
  },
};

export default connect(
  (state) => {
    return { userId: state.user ? state.user.id : null };
  },
)(injectSheet(View.styles)(View));
