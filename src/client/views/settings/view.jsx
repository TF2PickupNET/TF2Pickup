import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import {
  pipe,
  pluck,
} from '../../../utils/functions';

import RegionSetting from './region-setting';
import ThemeSetting from './theme-setting';
import AnnouncerSetting from './announncer-setting';
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
    <div className={props.classes.container}>
      <Helmet>
        <title>
          Settings
        </title>
      </Helmet>

      <RegionSetting />
      <ThemeSetting />
      <AnnouncerSetting />
      <VolumeSetting />
    </div>
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

export default pipe(
  connect((state) => {
    return { userId: pluck('user.id')(state) };
  }),
  injectSheet(View.styles),
)(View);
