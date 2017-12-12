import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from 'materialize-react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import RegionSetting from './region-setting';
import ThemeSetting from './theme-setting';
import VolumeSetting from './volume-setting';

/**
 * The view for the settings page.
 *
 * @returns {JSX} - Returns the view.
 */
function View(props) {
  if (!props.user) {
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

View.styles = {
  container: {
    maxWidth: 680,
    width: '100%',
  },
};

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(View.styles)(View));
